'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { products } from '@/lib/products';
import type { Product } from '@/lib/types';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const names = [
  "Aaron", "Abel", "Abraham", "Adam", "Adrian", "Aidan", "Alan", "Albert", "Alexander", "Alfred",
  "Amos", "Andrew", "Anthony", "Arlo", "Asher", "Augustine", "Austin", "Barnabas", "Bartholomew",
  "Benjamin", "Bennett", "Bernard", "Blaise", "Boaz", "Brad", "Brandon", "Brian", "Caleb", "Callum",
  "Carl", "Charles", "Christian", "Christopher", "Clark", "Clement", "Cody", "Colin", "Conrad",
  "Cornelius", "Daniel", "David", "Dennis", "Derek", "Dominic", "Donald", "Douglas", "Dylan",
  "Edward", "Edwin", "Eli", "Elias", "Elijah", "Elliot", "Emmanuel", "Ephraim", "Eric", "Ethan",
  "Ezekiel", "Ezra", "Fabian", "Felix", "Francis", "Frank", "Frederick", "Gabriel", "Gareth",
  "Gary", "Geoffrey", "George", "Gideon", "Gilbert", "Graham", "Gregory", "Harvey", "Henry",
  "Howard", "Hugh", "Ian", "Isaac", "Isaiah", "Ivan", "Jacob", "Jadon", "James", "Jared", "Jason",
  "Jasper", "Jethro", "Jerome", "Jesse", "Joel", "John", "Jonah", "Jonathan", "Jordan", "Joseph",
  "Joshua", "Josiah", "Jude", "Julian", "Justin", "Kevin", "Kyle", "Lambert", "Lance", "Laurence",
  "Leonard", "Levi", "Liam", "Lionel", "Lloyd", "Louis", "Lucas", "Luke", "Malachi", "Mark",
  "Martin", "Matthew", "Maurice", "Micah", "Michael", "Moses", "Nathan", "Nathaniel", "Neil",
  "Nicholas", "Noel", "Oliver", "Oscar", "Owen", "Patrick", "Paul", "Peter", "Philip", "Phineas",
  "Ralph", "Raymond", "Reuben", "Rhett", "Richard", "Robert", "Roger", "Ronald", "Rowan", "Rufus",
  "Russell", "Ryan", "Samuel", "Saul", "Sebastian", "Seth", "Shawn", "Silas", "Simeon", "Simon",
  "Solomon", "Stephen", "Steve", "Terrence", "Theodore", "Thomas", "Timothy", "Titus", "Tobias",
  "Trevor", "Tristan", "Uriel", "Victor", "Vincent", "Walter", "Warren", "Wesley", "William",
  "Xavier", "Zachary", "Zane", "Abelardo", "Abram", "Adriel", "Amos", "Augustine", "Baylor",
  "Benaiah", "Bennett", "Brooks", "Bryant", "Cadmus", "Cain", "Cassian", "Cedric", "Cyrus",
  "Darius", "Dawson", "Demetrius", "Denis", "Dominic", "Donovan", "Eamon", "Egan", "Eldon",
  "Elisha", "Emerson", "Emory", "Enzo", "Ephram", "Eston", "Everest", "Finley", "Finn", "Fisher",
  "Florian", "Forrest", "Foster", "Franco", "Gage", "Gael", "Galileo", "Gideon", "Greyson",
  "Hadriel", "Hamish", "Hank", "Harris", "Hart", "Harvey", "Hayes", "Hezekiah", "Holden", "Hudson",
  "Hugh", "Iker", "Immanuel", "Ira", "Irvin", "Isidore", "Jace", "Jadon", "Jagger", "Jairo",
  "Jakub", "Jalen"];
const cities = ['London', 'Manchester', 'Birmingham', 'Leeds', 'Glasgow', 'Bristol', 'Liverpool', 'Sheffield', 'Edinburgh', 'Cardiff', 'Belfast', 'Dublin', 'Newcastle', 'Nottingham', 'Southampton'];

type PurchaseInfo = {
  name: string;
  city: string;
  product: Product;
};

export function RealTimePurchasePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPurchase, setCurrentPurchase] = useState<PurchaseInfo | null>(null);

  useEffect(() => {
    const generateRandomPurchase = (): PurchaseInfo => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      return {
        name: randomName,
        city: randomCity,
        product: randomProduct,
      };
    };

    const showRandomPopup = () => {
      setCurrentPurchase(generateRandomPurchase());
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000); // Popup is visible for 5 seconds
    };

    // Show the first popup after an initial delay
    const firstPopupTimeout = setTimeout(showRandomPopup, Math.random() * 10000 + 5000);

    const interval = setInterval(() => {
      // Wait for a random time between 8 and 20 seconds before showing the next popup
      const randomDelay = Math.random() * 12000 + 8000;
      setTimeout(showRandomPopup, randomDelay);
    }, 15000); // Check to show a popup every 15 seconds

    return () => {
      clearInterval(interval);
      clearTimeout(firstPopupTimeout);
    };
  }, []);
  
  if (!currentPurchase) {
    return null;
  }
  
  const { name, city, product } = currentPurchase;
  const image = PlaceHolderImages.find((img) => img.id === product.images[0]);

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-50 transition-transform duration-500",
        isVisible ? "translate-x-0" : "-translate-x-[calc(100%+2rem)]"
      )}
    >
      <Card className="flex items-center gap-4 p-4 shadow-2xl max-w-sm">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
            {image && <Image src={image.imageUrl} alt={product.name} fill className="object-cover" />}
        </div>
        <div>
            <p className="text-sm font-medium">{name} from {city}</p>
            <p className="text-xs text-muted-foreground">just purchased a</p>
            <p className="text-sm font-semibold truncate">{product.name}</p>
        </div>
        <ShoppingCart className="h-5 w-5 text-primary ml-2 flex-shrink-0" />
      </Card>
    </div>
  );
}
