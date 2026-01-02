
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';

interface Course {
  id: number;
  name: string;
  credits: string;
  grade: string;
}

const gradeValues: Record<string, number> = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

export function GpaCalculator() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Example Course', credits: '3', grade: 'A' },
  ]);
  const [nextId, setNextId] = useState(2);

  const addCourse = () => {
    setCourses([...courses, { id: nextId, name: '', credits: '', grade: 'A' }]);
    setNextId(nextId + 1);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleCourseChange = (id: number, field: keyof Omit<Course, 'id'>, value: string) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const { gpa, totalCredits } = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const credits = parseFloat(course.credits);
      const gradeValue = gradeValues[course.grade];

      if (!isNaN(credits) && credits > 0 && gradeValue !== undefined) {
        totalCredits += credits;
        totalPoints += gradeValue * credits;
      }
    });

    if (totalCredits === 0) {
      return { gpa: 0, totalCredits: 0 };
    }

    return { gpa: totalPoints / totalCredits, totalCredits };
  }, [courses]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Courses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50%]">Course Name (Optional)</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map(course => (
                <TableRow key={course.id}>
                  <TableCell>
                    <Input
                      type="text"
                      placeholder="e.g., Intro to Psychology"
                      value={course.name}
                      onChange={(e) => handleCourseChange(course.id, 'name', e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      placeholder="e.g., 3"
                      value={course.credits}
                      onChange={(e) => handleCourseChange(course.id, 'credits', e.target.value)}
                      min="0"
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={course.grade}
                      onValueChange={(value) => handleCourseChange(course.id, 'grade', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(gradeValues).map(grade => (
                          <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => removeCourse(course.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Remove course</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Button variant="outline" onClick={addCourse} className="mt-4 w-full md:w-auto">
          <PlusCircle className="mr-2" /> Add Course
        </Button>
      </CardContent>
      <CardFooter className="bg-muted/50 p-6 rounded-b-lg">
        <div className="flex items-center justify-between w-full">
            <div>
                 <p className="text-sm text-muted-foreground">Total Credits</p>
                 <p className="text-2xl font-bold">{totalCredits}</p>
            </div>
            <div className="text-right">
                 <p className="text-sm text-muted-foreground">Your GPA</p>
                 <p className="text-4xl font-bold text-primary">{gpa.toFixed(2)}</p>
            </div>
        </div>
      </CardFooter>
    </Card>
  );
}
