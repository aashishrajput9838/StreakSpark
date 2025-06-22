import React from 'react';
import PageLayout from '@/components/PageLayout';

const TermsOfServicePage = () => {
    return (
        <PageLayout title="Terms of Service">
            <div className="prose prose-invert max-w-none text-slate-300">
                <p>Last updated: October 26, 2023</p>

                <h2>1. Agreement to Terms</h2>
                <p>By using our app, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the app.</p>

                <h2>2. User Accounts</h2>
                <p>You must be at least 13 years old to create an account. You are responsible for safeguarding your account and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.</p>

                <h2>3. User Content</h2>
                <p>You are responsible for the content that you post to the app, including its legality, reliability, and appropriateness. By posting content, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the app.</p>

                <h2>4. Prohibited Activities</h2>
                <p>You may not use the app for any illegal or unauthorized purpose. You agree to comply with all laws, rules, and regulations applicable to your use of the app.</p>

                <h2>5. Termination</h2>
                <p>We may terminate or suspend your account at any time, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
            </div>
        </PageLayout>
    );
};

export default TermsOfServicePage; 