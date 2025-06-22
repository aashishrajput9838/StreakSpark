import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, TrendingUp, PieChart } from 'lucide-react';

const AnalyticsPage = () => {
    return (
        <PageLayout title="Analytics">
            <div className="space-y-8">
                <p className="text-center text-lg text-slate-300">
                    Visualize your progress with our powerful analytics tools. Understand your habits and stay motivated.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    <Card className="bg-slate-800/50 border-blue-400/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-300">Completion Rate</CardTitle>
                            <BarChart className="h-4 w-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">92.5%</div>
                            <p className="text-xs text-slate-400">+1.5% from last month</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-800/50 border-purple-400/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-300">Active Streaks</CardTitle>
                            <TrendingUp className="h-4 w-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12</div>
                            <p className="text-xs text-slate-400">+2 from last week</p>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-800/50 border-pink-400/20">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-pink-300">Habit Distribution</CardTitle>
                            <PieChart className="h-4 w-4 text-slate-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5 Categories</div>
                            <p className="text-xs text-slate-400">Health, Work, Learning...</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </PageLayout>
    );
};

export default AnalyticsPage; 