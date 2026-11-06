import { getPublishedSuccessStories } from "@/repositories/public-content.repository";
import { getLocalized } from "@/lib/utils/locale-mapper";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SuccessStoriesPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const stories = await getPublishedSuccessStories();
  const tNav = await getTranslations("Navigation");

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-clinic-offwhite py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-clinic-forest">
            {tNav("success_stories")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Real outcomes from real patients. Discover how individualized homeopathic treatment transforms lives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 max-w-5xl">
        <div className="flex flex-col space-y-8">
          {stories.map((story) => {
            const title = getLocalized(story, "title", locale);
            const concern = getLocalized(story, "concern", locale);
            
            return (
              <div key={story.id} className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
                <div className="md:w-1/3 bg-clinic-sage/10 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-e border-border">
                  <HeartPulse className="h-10 w-10 text-clinic-sage mb-4" />
                  <h3 className="text-xl font-bold text-clinic-forest mb-2">{title}</h3>
                  <span className="text-sm font-medium text-clinic-charcoal/70 uppercase tracking-wider">{concern}</span>
                </div>
                <div className="md:w-2/3 p-8 flex flex-col justify-center">
                  <p className="text-lg text-clinic-charcoal italic mb-6">
                    &quot;{getLocalized(story, "outcome", locale)}&quot;
                  </p>
                  <div>
                    <Button asChild variant="outline">
                      <Link href={`/success-stories/${story.slug}`}>Read Full Case Study</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          
          {stories.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              New case studies are currently being documented and will be published soon.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}