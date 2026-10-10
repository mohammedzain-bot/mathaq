export type Category = 'starters' | 'salads' | 'mains' | 'grill' | 'desserts' | 'drinks'

export type Dish = {
  id: string
  category: Category
  nameAr: string
  nameEn: string
  descAr: string
  descEn: string
  price: number
  image: string
  veg?: boolean
  spicy?: boolean
  signature?: boolean
}

export const dishes: Dish[] = [
  {
    id: 'kabsa',
    category: 'mains',
    nameAr: 'كبسة الضأن',
    nameEn: 'Lamb kabsa',
    descAr: 'لحم ضأن يُطهى على مهل مع أرز البسمتي، بهارات نجد، ولوز محمص.',
    descEn: 'Slow lamb with basmati, Najdi spice, and toasted almonds.',
    price: 185,
    image:
      'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1400&q=80',
    signature: true,
  },
  {
    id: 'wagyu',
    category: 'grill',
    nameAr: 'لحم الواغيو بالتوابل السعودية',
    nameEn: 'Wagyu with Saudi spices',
    descAr: 'شريحة واغيو تُشوى على الجمر، تُدهن بسمنٍ مع الكمون والكزبرة اليابسة.',
    descEn: 'Wagyu over coals, brushed with samn, cumin, and dried coriander.',
    price: 320,
    image:
      'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1400&q=80',
    signature: true,
  },
  {
    id: 'fish',
    category: 'grill',
    nameAr: 'سمك مشوي على الطريقة الحجازية',
    nameEn: 'Hijazi grilled fish',
    descAr: 'هامور طازج، تتشريب حجازي بالليمون والكزبرة، يُقدَّم مع خبز التنور.',
    descEn: 'Fresh hamour, Hijazi citrus-coriander marinade, tannour bread.',
    price: 210,
    image:
      'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1400&q=80',
    signature: true,
  },
  {
    id: 'saffron-rice',
    category: 'mains',
    nameAr: 'رز الزعفران',
    nameEn: 'Saffron rice',
    descAr: 'أرز يُبخَّر بزعفرانٍ إيراني نقي وزبدة بلدية، يرافق أي طبقٍ من المشواة.',
    descEn: 'Steamed rice with pure saffron and farm butter — made for the grill.',
    price: 55,
    image:
      'https://images.unsplash.com/photo-1596560548464-f010549b84d7?auto=format&fit=crop&w=1400&q=80',
    veg: true,
    signature: true,
  },
  {
    id: 'date-salad',
    category: 'salads',
    nameAr: 'سلطة التمر والجرجير',
    nameEn: 'Date and rocket salad',
    descAr: 'جرجير بري، تمر الخلاص، جبن الماعز، ورشّة دبس رمان.',
    descEn: 'Wild rocket, Khalas dates, goat cheese, and a thread of pomegranate molasses.',
    price: 48,
    image:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1400&q=80',
    veg: true,
    signature: true,
  },
  {
    id: 'umali',
    category: 'desserts',
    nameAr: 'أم علي بالزعفران',
    nameEn: 'Umm Ali with saffron',
    descAr: 'خبزٌ محمص، قشطة، فستق، وخيط زعفران يذوب فوق السطح الذهبي.',
    descEn: 'Toasted bread, cream, pistachio, and a saffron thread over a golden crust.',
    price: 42,
    image:
      'https://images.unsplash.com/photo-1488477181946-6428a2926239?auto=format&fit=crop&w=1400&q=80',
    veg: true,
    signature: true,
  },
  {
    id: 'mutabbal',
    category: 'starters',
    nameAr: 'متبل الباذنجان المدخّن',
    nameEn: 'Smoked aubergine mutabbal',
    descAr: 'باذنجان يُشوى على الجمر حتى يذوب، طحينة، وزيت زيتون بكر.',
    descEn: 'Aubergine smoked over coals, tahini, and extra-virgin olive oil.',
    price: 38,
    image:
      'https://images.unsplash.com/photo-1572449043417-4f2cc3d4d3d3?auto=format&fit=crop&w=900&q=80',
    veg: true,
  },
  {
    id: 'sambousek',
    category: 'starters',
    nameAr: 'سمبوسك اللحم',
    nameEn: 'Lamb sambousek',
    descAr: 'عجين رقيق، لحم مفروم بالبهارات، يُقلى حتى يصدح.',
    descEn: 'Thin pastry, spiced minced lamb, fried until it sings.',
    price: 36,
    image:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
    spicy: true,
  },
  {
    id: 'shorba',
    category: 'starters',
    nameAr: 'شوربة العدس بالكمون',
    nameEn: 'Cumin lentil soup',
    descAr: 'عدس أحمر، كمون محمص، ولمسة ليمون قبل التقديم.',
    descEn: 'Red lentils, toasted cumin, lemon at the table.',
    price: 32,
    image:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
    veg: true,
  },
  {
    id: 'fattoush',
    category: 'salads',
    nameAr: 'فتوش نجد',
    nameEn: 'Najdi fattoush',
    descAr: 'خضار الموسم، خبز محمص، سماق، ورمان طائفي حين يتوفر.',
    descEn: 'Seasonal leaves, toasted bread, sumac, and Taif pomegranate when in season.',
    price: 44,
    image:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=80',
    veg: true,
  },
  {
    id: 'tabbouleh',
    category: 'salads',
    nameAr: 'تبولة بالنعناع النجدي',
    nameEn: 'Tabbouleh with Najdi mint',
    descAr: 'بقدونس كثيف، نعناع من المزرعة، برغل ناعم، وزيت زيتون.',
    descEn: 'Parsley-forward, farm mint, fine burghul, olive oil.',
    price: 40,
    image:
      'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=900&q=80',
    veg: true,
  },
  {
    id: 'mandi',
    category: 'mains',
    nameAr: 'مندي الدجاج البلدي',
    nameEn: 'Free-range chicken mandi',
    descAr: 'دجاج يُعلَّق فوق الأرز في التنور، هيل وزعفران خفيف.',
    descEn: 'Bird hung over rice in the tannour, cardamom and a hint of saffron.',
    price: 145,
    image:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'jareesh',
    category: 'mains',
    nameAr: 'جريش بالسمن البلدي',
    nameEn: 'Jareesh with samn',
    descAr: 'قمح مجروش يُطهى لساعات، يُسكب عليه سمنٌ ذهبي وبصل مكرمل.',
    descEn: 'Cracked wheat cooked for hours, finished with golden samn and caramelised onion.',
    price: 78,
    image:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
    veg: true,
  },
  {
    id: 'lamb-chops',
    category: 'grill',
    nameAr: 'ريش غنم على الفحم',
    nameEn: 'Coal-grilled lamb chops',
    descAr: 'ريش صغيرة تُتبل بالثوم والبزار، تُشوى حتى يتقرّش الطرف.',
    descEn: 'Small chops, garlic and baharat, grilled until the edge crackles.',
    price: 195,
    image:
      'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=900&q=80',
    spicy: true,
  },
  {
    id: 'kofta',
    category: 'grill',
    nameAr: 'كفتة الضأن',
    nameEn: 'Lamb kofta',
    descAr: 'لحم ضأن مفروم بالبقدونس والبصل، يُقدَّم مع طحينة مدخّنة.',
    descEn: 'Minced lamb with parsley and onion, smoked tahini.',
    price: 88,
    image:
      'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'luqaimat',
    category: 'desserts',
    nameAr: 'لقيمات بالعسل والسمن',
    nameEn: 'Luqaimat with honey and samn',
    descAr: 'كرات ذهبية تُسقى بعسل السدر وسمنٍ دافئ.',
    descEn: 'Golden doughnuts, sidr honey and warm samn.',
    price: 36,
    image:
      'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80',
    veg: true,
  },
  {
    id: 'kunafa',
    category: 'desserts',
    nameAr: 'كنافة بالقشطة',
    nameEn: 'Kunafa with ashta',
    descAr: 'عجين شعر ناعم، قشطة طازجة، قطر خفيف لا يطغى.',
    descEn: 'Fine kataifi, fresh ashta, a restrained syrup.',
    price: 48,
    image:
      'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80',
    veg: true,
  },
  {
    id: 'qahwa',
    category: 'drinks',
    nameAr: 'قهوة عربية بالهيل',
    nameEn: 'Arabic coffee with cardamom',
    descAr: 'تحميص خفيف، هيل طازج، تُقدَّم في دلال نحاسية.',
    descEn: 'Light roast, fresh cardamom, served in brass dallah.',
    price: 28,
    image:
      'https://images.unsplash.com/photo-1578374173705-1e87e2474931?auto=format&fit=crop&w=900&q=80',
    veg: true,
  },
  {
    id: 'karak',
    category: 'drinks',
    nameAr: 'شاي كرك',
    nameEn: 'Karak tea',
    descAr: 'شاي أسود يُغلى بالحليب والهيل، حلاوةٌ متوازنة.',
    descEn: 'Black tea simmered with milk and cardamom.',
    price: 22,
    image:
      'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?auto=format&fit=crop&w=900&q=80',
    veg: true,
  },
  {
    id: 'laban',
    category: 'drinks',
    nameAr: 'لبن بالنعناع',
    nameEn: 'Mint laban',
    descAr: 'لبن رائب بارد، نعناع طازج، رشة ملح.',
    descEn: 'Chilled laban, fresh mint, a pinch of salt.',
    price: 18,
    image:
      'https://images.unsplash.com/photo-1553787499-6f9133860278?auto=format&fit=crop&w=900&q=80',
    veg: true,
  },
]

export const gallery = [
  {
    id: 'g1',
    ar: 'صالة العشاء',
    en: 'The dining room',
    src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'g2',
    ar: 'الشيف في المطبخ',
    en: 'The chef at work',
    src: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'g3',
    ar: 'طبق التوقيع',
    en: 'A signature plate',
    src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'g4',
    ar: 'القهوة العربية',
    en: 'Arabic coffee',
    src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'g5',
    ar: 'تفاصيل المائدة',
    en: 'Table setting',
    src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'g6',
    ar: 'تفاصيل معمارية',
    en: 'Architectural detail',
    src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'g7',
    ar: 'أجواء المساء',
    en: 'Evening light',
    src: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=80',
  },
]

export const images = {
  hero: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=2400&q=80',
  intro:
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1400&q=80',
  heritage:
    'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&w=2000&q=80',
  chef: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=80',
  expHospitality:
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80',
  expFlavor:
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
  expAmbience:
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1600&q=80',
}

export const times = ['12:00', '13:00', '14:00', '18:00', '19:00', '20:00', '21:00', '22:00']
