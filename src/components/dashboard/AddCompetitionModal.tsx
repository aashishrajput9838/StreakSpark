import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Competition } from '@/types';

interface AddCompetitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCompetition: (competition: Omit<Competition, 'id'>) => void;
  onEditCompetition: (competition: Competition) => void;
  competitionToEdit: Competition | null;
}

const AddCompetitionModal: React.FC<AddCompetitionModalProps> = ({ isOpen, onClose, onAddCompetition, competitionToEdit, onEditCompetition }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [time, setTime] = useState('');
  const [startPoint, setStartPoint] = useState('');

  const isEditMode = competitionToEdit !== null;

  useEffect(() => {
    if (isEditMode) {
      setName(competitionToEdit.name);
      setDate(competitionToEdit.date);
      setDistance(competitionToEdit.distance);
      setTime(competitionToEdit.time);
      setStartPoint(competitionToEdit.startPoint);
    } else {
      // Reset fields when opening for add
      setName('');
      setDate('');
      setDistance('');
      setTime('');
      setStartPoint('');
    }
  }, [competitionToEdit, isOpen]);

  const handleSubmit = () => {
    if (name && date && distance && time && startPoint) {
      if (isEditMode) {
        onEditCompetition({ ...competitionToEdit, name, date, distance, time, startPoint });
      } else {
        onAddCompetition({ name, date, distance, time, startPoint });
      }
      onClose();
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900/80 backdrop-blur-sm border-purple-400/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-purple-400">{isEditMode ? 'Edit Competition' : 'Add a New Competition'}</DialogTitle>
          <DialogDescription className="text-slate-400">
            {isEditMode ? 'Update the details of the competition.' : 'Fill in the details for the new competition. This will be visible to all users.'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-slate-300">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3 bg-slate-800/50 border-slate-700/50" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right text-slate-300">
              Date
            </Label>
            <Input id="date" value={date} onChange={(e) => setDate(e.target.value)} className="col-span-3 bg-slate-800/50 border-slate-700/50" placeholder="e.g., 1 Jan" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="distance" className="text-right text-slate-300">
              Distance
            </Label>
            <Input id="distance" value={distance} onChange={(e) => setDistance(e.target.value)} className="col-span-3 bg-slate-800/50 border-slate-700/50" placeholder="e.g., 10km" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right text-slate-300">
              Time
            </Label>
            <Input id="time" value={time} onChange={(e) => setTime(e.target.value)} className="col-span-3 bg-slate-800/50 border-slate-700/50" placeholder="e.g., 09:00" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="startPoint" className="text-right text-slate-300">
              Start Point
            </Label>
            <Input id="startPoint" value={startPoint} onChange={(e) => setStartPoint(e.target.value)} className="col-span-3 bg-slate-800/50 border-slate-700/50" />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="ghost">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white">{isEditMode ? 'Update Competition' : 'Add Competition'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCompetitionModal; 