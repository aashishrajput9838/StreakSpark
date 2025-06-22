import React from 'react';
import PageLayout from '@/components/PageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BlogPage = () => {
    const posts = [
        { title: "The Power of Atomic Habits", excerpt: "Discover how small, consistent actions can lead to remarkable results.", author: "James Clear", date: "Oct 26, 2023" },
        { title: "10 Tips for Staying Motivated", excerpt: "Struggling to stay on track? These tips will help you maintain your motivation.", author: "Jane Doe", date: "Nov 5, 2023" },
        { title: "How to Build a Morning Routine", excerpt: "A step-by-step guide to creating a morning routine that sets you up for success.", author: "John Smith", date: "Nov 12, 2023" },
    ];

    return (
        <PageLayout title="Blog">
             <div className="grid md:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                    <Card key={index} className="bg-slate-800/50 border-purple-400/20 flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-purple-300">{post.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-slate-400">{post.excerpt}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium">{post.author}</p>
                                <p className="text-xs text-slate-500">{post.date}</p>
                            </div>
                            <Button variant="link" className="text-purple-400">Read More <ArrowRight className="w-4 h-4 ml-2" /></Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </PageLayout>
    );
};

export default BlogPage; 