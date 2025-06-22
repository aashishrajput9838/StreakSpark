import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const FeaturesPage = () => {
    const features = [
        "Track daily, weekly, and monthly habits",
        "Set goals and monitor your progress with detailed analytics",
        "Discover new habits from our curated library",
        "Engage with the community and join competitions",
        "AI-powered assistance to suggest new habits",
        "Sync across all your devices seamlessly",
        "Connect with Spotify to listen to music while tracking",
        "Customizable dashboard to fit your needs",
    ];

    return (
        <PageLayout title="Features">
            <div className="space-y-8">
                <p className="text-center text-lg text-slate-300">
                    StreakSpark is packed with features designed to help you build and maintain habits effectively.
                </p>
                <Card className="bg-slate-800/50 border-purple-400/20">
                    <CardHeader>
                        <CardTitle className="text-purple-300">Core Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {features.map((feature, index) => (
                                <li key={index} className="flex items-center gap-4">
                                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                                    <span className="text-slate-200">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </PageLayout>
    );
};

export default FeaturesPage; 