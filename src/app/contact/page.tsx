import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContactForm } from '@/components/contact/contact-form';
import { ContactInfo } from '@/components/contact/contact-info';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Deepak Malviya. Available for projects, collaborations, and conversations.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Let&apos;s <span className="text-primary">Connect</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Have a project in mind, want to collaborate, or just want to say hello? 
                I would love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <div>
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
