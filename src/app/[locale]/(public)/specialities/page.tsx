import { getPublishedSpecialities } from "@/repositories/public-content.repository";
import { getLocalized } from "@/lib/utils/locale-mapper";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Activity } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function SpecialitiesPage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const specialities = await getPublishedSpecialities();
  const tNav = await getTranslations("Navigation");

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-clinic-offwhite py-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-clinic-forest">
            {tNav("specialities")}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive homeopathic care tailored to your unique health requirements. Explore our core areas of expertise.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialities.map((spec) => {
            const title = getLocalized(spec, "title", locale);
            const excerpt = getLocalized(spec, "short_description", locale);
            
            return (
              <div key={spec.id} className="group relative flex flex-col justify-between bg-white rounded-2xl p-8 shadow-sm border border-border hover:shadow-md transition-shadow">
                <div>
                  <div className="h-12 w-12 rounded-lg bg-clinic-sage/20 flex items-center justify-center text-clinic-forest mb-6 group-hover:scale-110 transition-transform">
                    <Activity className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-clinic-forest mb-3">{title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{excerpt}</p>
                </div>
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/specialities/${spec.slug}`}>Learn More</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}