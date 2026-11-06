import { getSpecialityBySlug } from "@/repositories/public-content.repository";
import { getLocalized } from "@/lib/utils/locale-mapper";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { Activity, ChevronLeft } from "lucide-react";

export default async function SpecialityDetailPage({ 
  params 
}: { 
  params: Promise<{ locale: string, slug: string }> 
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const speciality = await getSpecialityBySlug(slug);
  
  if (!speciality) {
    notFound();
  }

  const title = getLocalized(speciality, "title", locale);
  const fullDesc = getLocalized(speciality, "full_description", locale) || getLocalized(speciality, "short_description", locale);

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        
        <Link href="/specialities" className="inline-flex items-center text-sm font-medium text-clinic-sage hover:text-clinic-forest mb-8 transition-colors">
          <ChevronLeft className="h-4 w-4 me-1 rtl:rotate-180" />
          Back to Specialities
        </Link>

        <div className="bg-clinic-offwhite rounded-3xl p-8 md:p-12 border border-border">
          <div className="h-16 w-16 rounded-xl bg-white shadow-sm flex items-center justify-center text-clinic-forest mb-6">
            <Activity className="h-8 w-8" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-clinic-forest mb-6">{title}</h1>
          
          <div className="prose prose-lg max-w-none text-clinic-charcoal prose-p:leading-relaxed prose-headings:text-clinic-forest">
            {/* If we were using TipTap, we'd render HTML here safely. For demo, we assume plain text or simple formatting */}
            <p className="whitespace-pre-wrap">{fullDesc}</p>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-lg font-medium text-clinic-forest">Need consultation for this concern?</p>
            <Button asChild size="lg">
              <Link href={`/book-appointment?type=${encodeURIComponent(title)}`}>
                Book Consultation
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}