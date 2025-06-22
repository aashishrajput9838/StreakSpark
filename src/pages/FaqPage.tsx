import React from 'react';
import PageLayout from '@/components/PageLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FaqPage = () => {
    const faqs = [
        { q: "What is StreakSpark?", a: "StreakSpark is a habit-tracking app designed to help you build and maintain positive habits through streaks, analytics, and community features." },
        { q: "Is StreakSpark free to use?", a: "Yes, StreakSpark offers a free tier with core features. We also have a premium subscription for advanced features like AI assistance and in-depth analytics." },
        { q: "How is my data protected?", a: "We take your privacy seriously. All your data is encrypted and stored securely. For more details, please see our Privacy Policy." },
        { q: "Can I use StreakSpark on multiple devices?", a: "Yes, your data is synced across all your devices, so you can track your habits from anywhere." },
        { q: "How do I delete my account?", a: "You can delete your account from the settings page. Please note that this action is irreversible and will permanently delete all your data." },
    ];

    return (
        <PageLayout title="Frequently Asked Questions">
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="hover:no-underline text-lg text-pink-300">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-slate-400">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </PageLayout>
    );
};

export default FaqPage; 