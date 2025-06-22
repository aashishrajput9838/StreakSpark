import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Briefcase } from 'lucide-react';

const CareersPage = () => {
    const openings = [
        { title: "Senior Frontend Engineer", location: "Remote", department: "Engineering" },
        { title: "Product Manager", location: "New York, NY", department: "Product" },
        { title: "UI/UX Designer", location: "Remote", department: "Design" },
    ];

    return (
        <PageLayout title="Careers">
            <div className="space-y-8">
                <p className="text-center text-lg text-slate-300">
                    Join our team and help us build the future of habit tracking.
                </p>
                <div className="space-y-4">
                    {openings.map((job, index) => (
                        <Card key={index} className="bg-slate-800/50 border-blue-400/20">
                            <CardHeader>
                                <CardTitle className="text-blue-300">{job.title}</CardTitle>
                                <CardDescription className="flex items-center gap-4 pt-2">
                                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {job.location}</span>
                                    <span className="flex items-center gap-2"><Briefcase className="w-4 h-4"/> {job.department}</span>
                                </CardDescription>
                            </CardHeader>
                            <CardFooter>
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white">Apply Now</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </PageLayout>
    );
};

export default CareersPage; 