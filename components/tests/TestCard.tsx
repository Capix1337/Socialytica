import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StaticImageData } from "next/image";

interface TestCardProps {
  slug: string;
  iconSrc: string;
  iconBgColor: string;
  title: string;
  description: string;
  imageSrc: string | StaticImageData;
}

export default function TestCard({
  slug,
  iconSrc,
  iconBgColor,
  title,
  description,
  imageSrc,
}: TestCardProps) {
  // Use the string URL directly or extract it from StaticImageData
  const imageUrl = typeof imageSrc === 'object' ? imageSrc.src : imageSrc;
  
  return (
    <Link href={`/tests/${slug}`} className="block">
      <Card className="min-w-[320px] w-[320px] overflow-hidden transition-all hover:shadow-md flex flex-col h-full">
        <CardHeader className="p-6">
          {/* Icon at the top left with consistent size */}
          <div 
            className="flex justify-center items-center rounded-full w-12 h-12 mb-4"
            style={{ backgroundColor: iconBgColor }}
          >
            <Image
              src={iconSrc}
              alt=""
              width={28}
              height={28}
              className="object-contain"
            />
          </div>
          
          {/* Text content below the icon */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {description}
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-0 mt-auto">
          <div className="relative h-48 w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
