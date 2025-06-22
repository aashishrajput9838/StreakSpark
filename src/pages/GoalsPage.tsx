import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, Target, Trophy } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const GoalsPage = () => {
    const goals = [
        { name: "Run a 5k Marathon", progress: 75, target: "5km" },
        { name: "Read 20 Books", progress: 40, target: "20 Books" },
        { name: "Learn a New Language", progress: 60, target: "B1 Level" },
    ];

    return (
        <PageLayout title="Goals">
            <div className="space-y-8">
                <div className="flex justify-between items-center">
                    <p className="text-lg text-slate-300">
                        Set long-term goals and track your progress towards achieving them.
                    </p>
                    <Button className="bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        New Goal
                    </Button>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {goals.map((goal, index) => (
                        <Card key={index} className="bg-slate-800/50 border-green-400/20">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle className="text-green-300">{goal.name}</CardTitle>
                                    <Trophy className="w-6 h-6 text-amber-400" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-slate-400">Progress</span>
                                    <span className="text-sm font-bold text-white">{goal.progress}%</span>
                                </div>
                                <Progress value={goal.progress} className="w-full" />
                                <div className="flex items-center justify-between mt-4">
                                    <Target className="w-4 h-4 text-slate-500" />
                                    <span className="text-xs text-slate-400">Target: {goal.target}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
};

export default GoalsPage; 