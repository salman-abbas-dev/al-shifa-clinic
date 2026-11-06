-- 1. Clinic Settings Seed
insert into public.clinic_settings (
  clinic_name_en, clinic_name_ur, 
  phone, whatsapp, email, 
  address_en, address_ur, 
  working_hours_en, working_hours_ur,
  marham_url
) values (
  'Al Shifa Homeopathic Clinic', 'الشفاء ہومیوپیتھک کلینک',
  '+92 300 1234567', '+92 300 1234567', 'contact@alshifaclinic.com',
  '123 Health Avenue, Sargodha, Punjab, Pakistan', '123 ہیلتھ ایونیو، سرگودھا، پنجاب، پاکستان',
  'Mon - Sat: 10:00 AM - 8:00 PM', 'پیر سے ہفتہ: صبح 10 بجے سے رات 8 بجے تک',
  'https://www.marham.pk/doctors/sargodha/homeopath/dr-ahmed-ali-dummy'
);

-- 2. Doctor Profile Seed
insert into public.doctor_profiles (
  name_en, name_ur, 
  bio_en, bio_ur, 
  philosophy_en, philosophy_ur, 
  experience_years
) values (
  'Dr. Ahmed Ali', 'ڈاکٹر احمد علی',
  'Dr. Ahmed Ali is a highly experienced homeopathic physician dedicated to providing personalized and holistic care to his patients in Sargodha.',
  'ڈاکٹر احمد علی ایک انتہائی تجربہ کار ہومیوپیتھک معالج ہیں جو سرگودھا میں اپنے مریضوں کو ذاتی اور جامع دیکھ بھال فراہم کرنے کے لیے وقف ہیں۔',
  'Treating the patient, not just the disease. Emphasizing the body''s natural healing capacity.',
  'صرف بیماری کا نہیں، مریض کا علاج کرنا۔ جسم کی قدرتی شفا یابی کی صلاحیت پر زور دینا۔',
  15
);

-- 3. Education Seed
insert into public.education (degree_en, degree_ur, institution_en, institution_ur, completion_year, display_order)
values 
('DHMS (Diploma in Homeopathic Medicine & Surgery)', 'ڈی ایچ ایم ایس (ڈپلومہ ان ہومیوپیتھک میڈیسن اینڈ سرجری)', 'National Council for Homeopathy, Pakistan', 'نیشنل کونسل فار ہومیوپیتھی، پاکستان', 2009, 1);

-- 4. Specialities Seed (Published)
insert into public.specialities (slug, title_en, title_ur, short_description_en, short_description_ur, is_published, display_order)
values 
('digestive-health', 'Digestive Health', 'ہاضمہ کی صحت', 'Safe and natural homeopathic approach to gastric issues, acidity, and IBS.', 'معدے کے مسائل، تیزابیت، اور آئی بی ایس کے لیے محفوظ اور قدرتی ہومیوپیتھک طریقہ کار۔', true, 1),
('skin-conditions', 'Skin Conditions', 'جلد کی بیماریاں', 'Holistic treatments for acne, eczema, and unexplained allergic rashes.', 'مہاسوں، ایکزیما، اور نامعلوم الرجک ریشز کے لیے جامع علاج۔', true, 2),
('joint-pain', 'Joint & Muscle Pain', 'جوڑوں اور پٹھوں کا درد', 'Addressing arthritis, rheumatism, and general musculoskeletal discomfort naturally.', 'گٹھیا، گٹھیا، اور عام پٹھوں کی تکلیف کو قدرتی طور پر حل کرنا۔', true, 3);

-- 5. Testimonial Seed
insert into public.testimonials (patient_name_en, patient_name_ur, review_en, review_ur, rating, is_published)
values 
('M. Usman (Sample)', 'محمد عثمان (نمونہ)', 'Dr. Ahmed took the time to understand my complete medical history before suggesting a remedy. Highly recommended!', 'ڈاکٹر احمد نے کوئی دوا تجویز کرنے سے پہلے میری مکمل طبی تاریخ سمجھنے کے لیے وقت نکالا۔ انتہائی تجویز کردہ!', 5, true);

-- 6. Blog Categories
insert into public.blog_categories (slug, name_en, name_ur)
values 
('wellness', 'General Wellness', 'عام فلاح و بہبود'),
('nutrition', 'Diet & Nutrition', 'خوراک اور غذائیت');

-- 7. Blog Posts (Draft & Published Sample)
insert into public.blog_posts (slug, category_id, title_en, title_ur, excerpt_en, excerpt_ur, is_published, published_at)
values 
('understanding-digestive-health-homeopathy', 
 (select id from public.blog_categories where slug = 'wellness'),
 'Understanding Digestive Health through Homeopathy', 
 'ہومیوپیتھی کے ذریعے ہاضمہ کی صحت کو سمجھنا',
 'Learn how homeopathy addresses the root causes of common digestive ailments...',
 'جانیں کہ ہومیوپیتھی کس طرح ہاضمہ کی عام بیماریوں کی بنیادی وجوہات کو دور کرتی ہے...',
 true, now());

-- 8. Appointments Seed (One pending sample)
insert into public.appointments (reference_code, patient_name, phone, consultation_type, appointment_date, appointment_time, reason)
values 
('REF-SAMPLE-01', 'Ali Hassan', '03001234567', 'Skin Consultation', CURRENT_DATE + interval '2 days', '14:00:00', 'Persistent skin rash for 2 weeks.');