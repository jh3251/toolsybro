'use client';

import { useState, useMemo, useRef } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { initiateAnonymousSignIn, useAuth } from '@/firebase';
import {
  setDocumentNonBlocking,
  deleteDocumentNonBlocking,
} from '@/firebase/non-blocking-updates';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, PlusCircle, Trash2, Edit, Calendar as CalendarIcon, Camera } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '../ui/label';

type TaskStatus = 'To Do' | 'In Progress' | 'Done';

interface StudyTask {
  id: string;
  userId: string;
  title: string;
  subject?: string;
  dueDate?: Timestamp;
  status: TaskStatus;
  createdAt: Timestamp;
}

function TaskForm({
  task,
  onSave,
  onClose,
}: {
  task?: StudyTask | null;
  onSave: (data: Partial<StudyTask>) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(task?.title || '');
  const [subject, setSubject] = useState(task?.subject || '');
  const [dueDate, setDueDate] = useState<Date | undefined>(task?.dueDate?.toDate());
  const [status, setStatus] = useState<TaskStatus>(task?.status || 'To Do');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onSave({ 
        title, 
        subject, 
        dueDate: dueDate, 
        status 
    });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDueDate(new Date(e.target.value));
    } else {
      setDueDate(undefined);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Read Chapter 5" required />
      </div>
       <div>
        <Label htmlFor="subject">Subject</Label>
        <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g., History" />
      </div>
      <div className='grid grid-cols-2 gap-4'>
        <div>
            <Label>Due Date</Label>
            <Input 
              type="date"
              value={dueDate ? format(dueDate, 'yyyy-MM-dd') : ''}
              onChange={handleDateChange}
            />
        </div>
        <div>
            <Label>Status</Label>
            <Select value={status} onValueChange={(v: TaskStatus) => setStatus(v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="To Do">To Do</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save Task</Button>
      </div>
    </form>
  );
}

function TaskCard({ task, onEdit, onDelete }: { task: StudyTask, onEdit: () => void, onDelete: () => void }) {
    const dueDate = task.dueDate ? task.dueDate.toDate() : null;
    const isOverdue = dueDate && !task.status.includes('Done') ? dueDate < new Date() : false;

    return (
        <Card className='mb-4'>
            <CardHeader className='pb-2'>
                <CardTitle className='text-base'>{task.title}</CardTitle>
                {task.subject && <CardDescription>{task.subject}</CardDescription>}
            </CardHeader>
            <CardContent className='pb-4'>
                {dueDate && (
                    <div className={cn('text-xs font-medium flex items-center', isOverdue ? 'text-destructive' : 'text-muted-foreground')}>
                        <CalendarIcon className='mr-1.5 h-3 w-3'/>
                        Due: {format(dueDate, 'MMM d, yyyy')}
                    </div>
                )}
            </CardContent>
            <CardFooter className='flex justify-end gap-1 p-2'>
                <Button variant="ghost" size="icon" onClick={onEdit}><Edit className="h-4 w-4" /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className='text-destructive hover:text-destructive'><Trash2 className="h-4 w-4" /></Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>This action will permanently delete this task.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}

const statusColumns: TaskStatus[] = ['To Do', 'In Progress', 'Done'];

export function StudyPlanner() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const [selectedTask, setSelectedTask] = useState<StudyTask | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const columnRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const kanbanBoardRef = useRef<HTMLDivElement | null>(null);

  const tasksCollectionRef = useMemoFirebase(() => {
    if (firestore && user) {
      return collection(firestore, 'users', user.uid, 'studyTasks');
    }
    return null;
  }, [firestore, user]);

  const { data: tasks, isLoading: isTasksLoading } = useCollection<StudyTask>(tasksCollectionRef);

  const handleSignIn = () => {
    initiateAnonymousSignIn(auth);
  };

  const handleSaveTask = (data: Partial<StudyTask>) => {
    if (!firestore || !user) return;
    
    const taskData = {
        ...data,
        userId: user.uid,
    };

    if (selectedTask) {
        const docRef = doc(firestore, 'users', user.uid, 'studyTasks', selectedTask.id);
        setDocumentNonBlocking(docRef, taskData, { merge: true });
    } else {
        const docRef = doc(collection(firestore, 'users', user.uid, 'studyTasks'));
        setDocumentNonBlocking(docRef, { ...taskData, id: docRef.id, createdAt: serverTimestamp() }, { merge: true });
    }

    setIsFormOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: string) => {
    if (!firestore || !user) return;
    const docRef = doc(firestore, 'users', user.uid, 'studyTasks', taskId);
    deleteDocumentNonBlocking(docRef);
  };

  const handleClearAll = () => {
    if (passwordInput !== '123') {
        alert('Incorrect password.');
        return;
    }
    if (!firestore || !user || !tasks) return;
    tasks.forEach(task => {
        const docRef = doc(firestore, 'users', user.uid, 'studyTasks', task.id);
        deleteDocumentNonBlocking(docRef);
    });
    setPasswordInput('');
  };

  const handleScreenshot = (status: TaskStatus) => {
    const columnElement = columnRefs.current[status];
    if (columnElement) {
      html2canvas(columnElement, { useCORS: true, backgroundColor: null }).then((canvas) => {
        const link = document.createElement('a');
        link.download = `tasks-${status.toLowerCase().replace(' ', '-')}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const handleScreenshotAll = () => {
    const boardElement = kanbanBoardRef.current;
    if (boardElement) {
      html2canvas(boardElement, { useCORS: true, backgroundColor: null, windowWidth: boardElement.scrollWidth, windowHeight: boardElement.scrollHeight }).then((canvas) => {
        const link = document.createElement('a');
        link.download = `study-plan.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };


  const openForm = (task?: StudyTask | null) => {
    setSelectedTask(task || null);
    setIsFormOpen(true);
  };
  
  const tasksByStatus = useMemo(() => {
    const grouped: Record<TaskStatus, StudyTask[]> = { 'To Do': [], 'In Progress': [], 'Done': [] };
    tasks?.forEach(task => {
        if (grouped[task.status]) {
            grouped[task.status].push(task);
        }
    });
    return grouped;
  }, [tasks]);

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <Card className="text-center">
        <CardHeader>
          <CardTitle>Welcome to the Study Planner</CardTitle>
          <CardDescription>Please sign in to create and manage your study plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignIn}>Sign In Anonymously</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={(open) => { if (!open) setSelectedTask(null); setIsFormOpen(open);}}>
      <div className="space-y-6">
        <div className="flex justify-end gap-2">
           <Button variant="outline" onClick={handleScreenshotAll} disabled={!tasks || tasks.length === 0}>
                <Camera className="mr-2 h-4 w-4" />
                Screenshot All
            </Button>
           <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={!tasks || tasks.length === 0}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your tasks. This action cannot be undone. To confirm, please type '123' below.
                  </AlertDialogDescription>
                  <Input
                    type="password"
                    placeholder="Enter password to confirm"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setPasswordInput('')}>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleClearAll} disabled={passwordInput !== '123'}>
                    Delete All Tasks
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
           <DialogTrigger asChild>
                <Button onClick={() => openForm(null)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> New Task
                </Button>
           </DialogTrigger>
        </div>

        {isTasksLoading ? (
             <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin" /></div>
        ) : (
             <div ref={kanbanBoardRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {statusColumns.map(status => (
                    <div key={status} ref={el => columnRefs.current[status] = el} className='bg-muted/50 rounded-lg p-4'>
                        <div className='flex justify-between items-center mb-4'>
                           <h3 className='font-semibold text-lg text-center'>{status}</h3>
                           <Button variant="ghost" size="icon" onClick={() => handleScreenshot(status)}>
                              <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className='space-y-4 min-h-[100px]'>
                            {tasksByStatus[status].map(task => (
                                  <TaskCard 
                                      key={task.id}
                                      task={task}
                                      onEdit={() => openForm(task)}
                                      onDelete={() => handleDeleteTask(task.id)}
                                  />
                            ))}
                             {tasksByStatus[status].length === 0 && (
                                <div className='text-center text-sm text-muted-foreground pt-4'>
                                    No tasks here.
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )}

        <DialogContent>
            <DialogHeader>
                <DialogTitle>{selectedTask ? 'Edit Task' : 'Create New Task'}</DialogTitle>
            </DialogHeader>
            <TaskForm 
                task={selectedTask} 
                onSave={handleSaveTask} 
                onClose={() => setIsFormOpen(false)}
            />
        </DialogContent>
      </div>
    </Dialog>
  );
}
