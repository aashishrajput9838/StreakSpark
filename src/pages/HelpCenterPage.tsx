import React from 'react';
import PageLayout from '@/components/PageLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const HelpCenterPage = () => {
    const faqs = [
        { q: "How do I create a new habit?", a: "You can create a new habit from the dashboard by clicking the 'New Habit' button. You can also browse popular habits from the habit library." },
        { q: "How does the analytics page work?", a: "The analytics page provides detailed visualizations of your habit completion rates, streaks, and other metrics to help you understand your progress." },
        { q: "Can I connect my Spotify account?", a: "Yes, you can connect your Spotify account to listen to music while you track your habits. You can find this option in the dashboard." },
        { q: "Is there a community feature?", a: "Yes, you can join competitions and see how you rank against your friends on the leaderboard." },
    ];

    return (
        <PageLayout title="Help Center">
            <div className="space-y-8 max-w-4xl mx-auto">
                <p className="text-center text-lg text-slate-300">
                    How can we help you?
                </p>
                <div className="flex w-full items-center space-x-2">
                    <Input type="text" placeholder="Search for help..." className="bg-slate-800/50 border-purple-400/20" />
                    <Button type="submit" className="bg-purple-500 hover:bg-purple-600 text-white">
                        <Search className="w-4 h-4 mr-2"/> Search
                    </Button>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="hover:no-underline text-lg text-purple-300">{faq.q}</AccordionTrigger>
                            <AccordionContent className="text-slate-400">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </PageLayout>
    );
};

export default HelpCenterPage; 