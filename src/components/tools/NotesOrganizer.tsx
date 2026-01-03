'use client';

import { useState, useMemo, useRef } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { initiateAnonymousSignIn, useAuth } from '@/firebase';
import html2canvas from 'html2canvas';
import {
  setDocumentNonBlocking,
  deleteDocumentNonBlocking,
} from '@/firebase/non-blocking-updates';
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
import { Textarea } from '@/components/ui/textarea';
import { Loader2, PlusCircle, Trash2, Edit, Camera } from 'lucide-react';
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: any;
  lastModified: any;
}

function NoteForm({
  note,
  onSave,
  onClose,
}: {
  note?: Note | null;
  onSave: (title: string, content: string) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(title, content);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        required
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Note Content"
        required
        rows={6}
      />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Save Note</Button>
      </div>
    </form>
  );
}

export function NotesOrganizer() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const noteCardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const allNotesContainerRef = useRef<HTMLDivElement | null>(null);

  const notesCollectionRef = useMemoFirebase(() => {
    if (firestore && user) {
      return collection(firestore, 'users', user.uid, 'notes');
    }
    return null;
  }, [firestore, user]);

  const {
    data: notes,
    isLoading: isNotesLoading,
    error: notesError,
  } = useCollection<Note>(notesCollectionRef);

  const handleSignIn = () => {
    initiateAnonymousSignIn(auth);
  };

  const handleSaveNote = (title: string, content: string) => {
    if (!firestore || !user) return;
    
    const noteData = {
        title,
        content,
        userId: user.uid,
        lastModified: serverTimestamp(),
    };

    if (selectedNote) {
        const docRef = doc(firestore, 'users', user.uid, 'notes', selectedNote.id);
        setDocumentNonBlocking(docRef, noteData, { merge: true });
    } else {
        const docRef = doc(collection(firestore, 'users', user.uid, 'notes'));
        setDocumentNonBlocking(docRef, { ...noteData, createdAt: serverTimestamp(), id: docRef.id }, { merge: true });
    }

    setIsFormOpen(false);
    setSelectedNote(null);
  };
  
  const handleDeleteNote = (noteId: string) => {
    if (!firestore || !user) return;
    const docRef = doc(firestore, 'users', user.uid, 'notes', noteId);
    deleteDocumentNonBlocking(docRef);
  };

  const handleScreenshot = (noteId: string) => {
    const noteElement = noteCardRefs.current[noteId];
    if (noteElement) {
      html2canvas(noteElement, { useCORS: true, backgroundColor: null }).then((canvas) => {
        const link = document.createElement('a');
        link.download = `note-${noteId}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const handleScreenshotAll = () => {
    const allNotesElement = allNotesContainerRef.current;
    if (allNotesElement) {
      html2canvas(allNotesElement, { useCORS: true, backgroundColor: null, windowWidth: allNotesElement.scrollWidth, windowHeight: allNotesElement.scrollHeight }).then((canvas) => {
        const link = document.createElement('a');
        link.download = `all-notes.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      });
    }
  };

  const openForm = (note?: Note | null) => {
    setSelectedNote(note || null);
    setIsFormOpen(true);
  };

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
          <CardTitle>Welcome to the Notes Organizer</CardTitle>
          <CardDescription>
            Please sign in to securely save and manage your notes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleSignIn}>Sign In Anonymously</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <div className="space-y-6">
        <div className="flex justify-end gap-2">
           <Button variant="outline" onClick={handleScreenshotAll} disabled={!notes || notes.length === 0}>
                <Camera className="mr-2 h-4 w-4" />
                Screenshot All
            </Button>
           <DialogTrigger asChild>
                <Button onClick={() => openForm(null)}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Note
                </Button>
           </DialogTrigger>
        </div>

        {isNotesLoading && <div className="text-center">Loading notes...</div>}
        {notesError && <div className="text-destructive text-center">Error: {notesError.message}</div>}

        {!isNotesLoading && notes?.length === 0 && (
             <div className="text-center text-muted-foreground py-10 border-2 border-dashed rounded-lg">
                <p>No notes yet.</p>
                <p>Click "New Note" to get started.</p>
            </div>
        )}
        
        <div ref={allNotesContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes?.sort((a, b) => {
            const timeA = a.lastModified?.toMillis() ?? 0;
            const timeB = b.lastModified?.toMillis() ?? 0;
            return timeB - timeA;
          }).map((note) => (
            <Card key={note.id} ref={(el) => (noteCardRefs.current[note.id] = el)}>
              <CardHeader className="p-4">
                <CardTitle>{note.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-muted-foreground">{note.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between p-4 pt-0">
                <div className='flex'>
                  <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => openForm(note)}>
                          <Edit className="h-4 w-4" />
                      </Button>
                  </DialogTrigger>
                  <Button variant="ghost" size="icon" onClick={() => handleScreenshot(note.id)}>
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className='text-destructive'>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete the note titled "{note.title}".
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDeleteNote(note.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          ))}
        </div>

        <DialogContent>
            <DialogHeader>
                <DialogTitle>{selectedNote ? 'Edit Note' : 'Create Note'}</DialogTitle>
                <DialogDescription>
                    {selectedNote ? 'Update your existing note.' : 'Add a new note to your collection.'}
                </DialogDescription>
            </DialogHeader>
            <NoteForm 
                note={selectedNote} 
                onSave={handleSaveNote} 
                onClose={() => setIsFormOpen(false)}
            />
        </DialogContent>
      </div>
    </Dialog>
  );
}
