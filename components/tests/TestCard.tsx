import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface TestCardProps {
  slug: string;
  iconSrc: string;
  iconBgColor: string;
  title: string;
  description: string;
  imageSrc: string;
}

export default function TestCard({
  slug,
  iconSrc,
  iconBgColor,
  title,
  description,
  imageSrc,
}: TestCardProps) {
  return (
    <Card className="min-w-[320px] w-[320px] overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-6">
        <div className="flex items-start gap-4">
          <div 
            className="flex justify-center items-center rounded-full w-14 h-14 shrink-0"
            style={{ backgroundColor: iconBgColor }}
          >
            <Image
              src={iconSrc}
              alt=""
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="p-4 flex justify-end">
          <Button asChild size="sm" className="gap-2">
            <Link href={`/tests/${slug}`}>
              Take Test
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
