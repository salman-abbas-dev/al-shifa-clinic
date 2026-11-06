import { getSuccessStoryBySlug } from "@/repositories/public-content.repository";
import { getLocalized } from "@/lib/utils/locale-mapper";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ChevronLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SuccessStoryDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string, slug: string }> 
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const story = await getSuccessStoryBySlug(slug);
  
  if (!story) notFound();

  const title = getLocalized(story, "title", locale);
  const initial = getLocalized(story, "initial_situation", locale);
  const approach = getLocalized(story, "approach", locale);
  const outcome = getLocalized(story, "outcome", locale);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <Link href="/success-stories" className="inline-flex items-center text-sm font-medium text-clinic-sage hover:text-clinic-forest mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4 me-1 rtl:rotate-180" />
          Back to Success Stories
        </Link>

        <h1 className="text-3xl md:text-5xl font-bold text-clinic-forest mb-12">{title}</h1>

        <div className="space-y-12">
          {/* Situation Section */}
          <section className="bg-clinic-offwhite p-8 rounded-2xl border border-border">
            <h2 className="text-2xl font-bold text-clinic-charcoal mb-4">Initial Situation</h2>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">{initial}</p>
          </section>

          {/* Approach Section */}
          <section className="bg-white p-8 rounded-2xl border border-border shadow-sm">
            <h2 className="text-2xl font-bold text-clinic-charcoal mb-4">Our Approach</h2>
            <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">{approach}</p>
          </section>

          {/* Outcome Section */}
          <section className="bg-clinic-forest text-white p-8 rounded-2xl shadow-md flex gap-6 items-start">
            <CheckCircle2 className="h-10 w-10 text-clinic-gold shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold mb-4">The Outcome</h2>
              <p className="text-lg leading-relaxed text-white/90 whitespace-pre-wrap italic">
                &quot;{outcome}&quot;
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/book-appointment">Book Your Consultation</Link>
          </Button>
        </div>

      </div>
    </div>
  );
}