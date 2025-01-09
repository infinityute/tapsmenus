import { useState } from "react";
import { Utensils, ChevronDown } from "lucide-react";
import { MenuItem, MenuStyles } from "./menu/types";
import { CardLayout } from "./menu/layouts/CardLayout";
import { ListLayout } from "./menu/layouts/ListLayout";
import { GridLayout } from "./menu/layouts/GridLayout";
import { ElegantLayout } from "./menu/layouts/ElegantLayout";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "./ui/button";
import { CategoryFilters } from "./menu/CategoryFilters";
import { OrderProvider } from "./menu/OrderContext";
import { OrderSummary } from "./menu/OrderSummary";

const sampleMenuItems: MenuItem[] = [
  // Antipasti
  {
    id: "1",
    name: "Bruschetta Classica",
    description: "Pane tostato con pomodori freschi, aglio, basilico e olio extra vergine d'oliva",
    price: "8.99",
    category: "antipasto",
    image: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=500"
  },
  {
    id: "2",
    name: "Insalata Caprese",
    description: "Mozzarella fresca, pomodori e basilico con glassa balsamica",
    price: "10.99",
    category: "antipasto",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500"
  },
  {
    id: "3",
    name: "Calamari Fritti",
    description: "Calamari croccanti serviti con salsa marinara",
    price: "12.99",
    category: "antipasto",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=500"
  },
  {
    id: "4",
    name: "Zuppa di Funghi",
    description: "Crema di funghi con olio al tartufo",
    price: "9.99",
    category: "antipasto",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=500"
  },
  {
    id: "5",
    name: "Antipasto Misto",
    description: "Selezione di salumi italiani, formaggi e verdure marinate",
    price: "16.99",
    category: "antipasto",
    image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=500"
  },
  
  // Primi Piatti
  {
    id: "6",
    name: "Bistecca alla Fiorentina",
    description: "Bistecca di manzo con rosmarino e aglio",
    price: "34.99",
    category: "primo",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500"
  },
  {
    id: "7",
    name: "Risotto ai Funghi",
    description: "Risotto cremoso ai funghi con parmigiano",
    price: "19.99",
    category: "primo",
    image: "https://images.unsplash.com/photo-1633964913295-ceb43826a07f?w=500"
  },
  {
    id: "8",
    name: "Spaghetti alle Vongole",
    description: "Spaghetti con vongole in salsa al vino bianco",
    price: "22.99",
    category: "primo",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500"
  },
  {
    id: "9",
    name: "Osso Buco",
    description: "Stinco di vitello brasato con gremolata",
    price: "28.99",
    category: "primo",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500"
  },
  {
    id: "10",
    name: "Branzino al Forno",
    description: "Branzino intero al forno con erbe e limone",
    price: "26.99",
    category: "primo",
    image: "https://images.unsplash.com/photo-1534766555764-ce878a5e3a2b?w=500"
  },
  {
    id: "11",
    name: "Gnocchi al Pesto",
    description: "Gnocchi di patate con pesto fresco al basilico",
    price: "18.99",
    category: "primo",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500"
  },
  {
    id: "12",
    name: "Pollo alla Cacciatora",
    description: "Pollo in umido con pomodori ed erbe",
    price: "23.99",
    category: "primo",
    image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500"
  },
  
  // Pizze
  {
    id: "13",
    name: "Margherita D.O.P.",
    description: "Pomodori San Marzano, mozzarella di bufala, basilico fresco",
    price: "16.99",
    category: "pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500"
  },
  {
    id: "14",
    name: "Diavola",
    description: "Salame piccante, pomodori, mozzarella, olio al peperoncino",
    price: "18.99",
    category: "pizza",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500"
  },
  {
    id: "15",
    name: "Quattro Formaggi",
    description: "Pizza con gorgonzola, mozzarella, parmigiano e fontina",
    price: "19.99",
    category: "pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
  },
  
  // Dolci
  {
    id: "16",
    name: "Tiramisù",
    description: "Classico dessert italiano con savoiardi inzuppati al caffè e crema al mascarpone",
    price: "8.99",
    category: "dolce",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500"
  },
  {
    id: "17",
    name: "Panna Cotta",
    description: "Panna cotta alla vaniglia con composta di frutti di bosco",
    price: "7.99",
    category: "dolce",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500"
  },
  {
    id: "18",
    name: "Cannoli Siciliani",
    description: "Cannoli croccanti ripieni di crema di ricotta dolce",
    price: "6.99",
    category: "dolce",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=500"
  },
  {
    id: "19",
    name: "Gelato Misto",
    description: "Selezione di tre gusti di gelato artigianale",
    price: "7.99",
    category: "dolce",
    image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=500"
  },
  {
    id: "20",
    name: "Affogato al Caffè",
    description: "Gelato alla vaniglia 'affogato' in caffè espresso caldo",
    price: "6.99",
    category: "dolce",
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500"
  }
];

interface MenuPreviewProps {
  styles?: MenuStyles;
  items?: MenuItem[];
}

export const MenuPreview = ({ styles, items = sampleMenuItems }: MenuPreviewProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openCategories, setOpenCategories] = useState<string[]>(["all"]);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    const category = item.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, typeof items>);

  const backgroundStyle = {
    backgroundImage: styles?.backgroundImage ? `url(${styles.backgroundImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundColor: styles?.backgroundColor || "#FFFBF5",
    color: styles?.textColor || "#2C1810",
    fontFamily: styles?.fontFamily || "Garamond, serif",
  };

  const headerStyle = {
    backgroundImage: styles?.headerImage ? `url(${styles.headerImage})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: styles?.primaryColor || "#2C1810",
    padding: styles?.headerPadding === "small" ? "1rem" : 
            styles?.headerPadding === "large" ? "3rem" : "2rem",
    textAlign: styles?.headerAlignment || "center",
  } as const;

  const toggleCategory = (category: string) => {
    setOpenCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const renderLayout = (items: MenuItem[], category: string) => {
    switch (styles?.layout) {
      case "elegant":
        return <ElegantLayout items={items} category={category} styles={styles} />;
      case "list":
        return <ListLayout items={items} category={category} styles={styles} />;
      case "grid":
        return <GridLayout items={items} category={category} styles={styles} />;
      case "card":
      default:
        return <CardLayout items={items} category={category} styles={styles} />;
    }
  };

  return (
    <OrderProvider>
      <div className="min-h-screen pb-24" style={backgroundStyle}>
        <section className="py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {styles?.showHeader !== false && (
              <div 
                className="text-center mb-12 p-8 rounded-lg text-white bg-opacity-90"
                style={headerStyle}
              >
                <h2 className="text-4xl font-serif mb-4">
                  {styles?.headerTitle || "Anteprima Menu"}
                </h2>
                <p className="text-xl text-gray-300 font-serif">
                  {styles?.headerSubtitle || "Scopri le nostre deliziose proposte"}
                </p>
              </div>
            )}

            {styles?.showSearchBar !== false && (
              <CategoryFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={["tutti", ...new Set(items.map(item => item.category))]}
                styles={styles}
              />
            )}

            <div className="space-y-8">
              {Object.entries(groupedItems).map(([category, categoryItems]) => (
                styles?.collapsibleCategories ? (
                  <Collapsible
                    key={category}
                    open={openCategories.includes(category)}
                    onOpenChange={() => toggleCategory(category)}
                    className="space-y-2"
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-between p-4 hover:bg-black/5 rounded-lg transition-colors"
                        style={{ color: styles?.textColor }}
                      >
                        <h3 className="text-3xl font-serif capitalize">
                          {category}
                        </h3>
                        <ChevronDown 
                          className={`h-6 w-6 transition-transform duration-200 ${
                            openCategories.includes(category) ? 'transform rotate-180' : ''
                          }`}
                        />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-6">
                      {renderLayout(categoryItems, category)}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <div key={category} className="space-y-6">
                    <h3 className="text-3xl font-serif capitalize mb-6">
                      {category}
                    </h3>
                    {renderLayout(categoryItems, category)}
                  </div>
                )
              ))}
              
              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <Utensils className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600">Nessun elemento del menu trovato</p>
                </div>
              )}
            </div>
          </div>
        </section>
        <OrderSummary />
      </div>
    </OrderProvider>
  );
};
