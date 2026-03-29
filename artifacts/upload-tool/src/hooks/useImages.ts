import { useQuery } from "@tanstack/react-query";

export interface ImageRecord {
  id: number;
  label: string;
  cloudinaryUrl: string;
  publicId: string;
  originalFilename: string;
  createdAt: string;
}

export function useImages() {
  return useQuery<ImageRecord[]>({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await fetch("/api/images");
      if (!res.ok) return [];
      return res.json();
    },
  });
}

export function getImageByLabel(images: ImageRecord[], label: string): string | undefined {
  return images.find((img) => img.label === label)?.cloudinaryUrl;
}

const LOCAL_IMAGES = [
  "/images/IMG_8402_1774811591747.png",
  "/images/IMG_8404_1774811591747.jpeg",
  "/images/IMG_8405_1774811591747.jpeg",
  "/images/IMG_8406_1774811591747.png",
  "/images/IMG_8407_1774811591747.jpeg",
  "/images/IMG_8408_1774811591747.jpeg",
  "/images/IMG_8409_1774811591747.png",
  "/images/IMG_8410_1774811591747.png",
  "/images/IMG_8411_1774811591747.jpeg",
  "/images/IMG_8412_1774811591747.png",
  "/images/IMG_8413_1774811591747.jpeg",
  "/images/IMG_8414_1774811591747.png",
  "/images/IMG_8415_1774811591747.png",
  "/images/IMG_8416_1774811591747.jpeg",
  "/images/IMG_8417_1774811591747.png",
  "/images/IMG_8418_1774811591747.jpeg",
  "/images/IMG_8420_1774811591747.jpeg",
  "/images/IMG_8422_1774811591747.jpeg",
  "/images/IMG_8423_1774812080416.jpeg",
  "/images/IMG_8425_1774811591747.jpeg",
  "/images/IMG_8427_1774812080416.jpeg",
  "/images/IMG_8429_1774812080416.jpeg",
  "/images/IMG_8430_1774812080416.jpeg",
  "/images/IMG_8431_1774812080416.jpeg",
  "/images/IMG_8432_1774812080416.jpeg",
  "/images/IMG_8433_1774812080416.png",
  "/images/IMG_8434_1774812080416.png",
  "/images/IMG_8435_1774812080416.png",
  "/images/IMG_8436_1774812080416.png",
  "/images/IMG_8437_1774812080416.png",
  "/images/IMG_8438_1774812080416.png",
  "/images/IMG_8440_1774812080416.jpeg",
  "/images/IMG_8445_1774812080416.jpeg",
  "/images/IMG_8446_1774812080416.jpeg",
  "/images/IMG_8447_1774812080416.jpeg",
  "/images/IMG_8450_1774812080416.jpeg",
  "/images/IMG_8405_1774812080416.jpeg",
];

function applyCloudinaryEnhancements(url: string): string {
  return url.replace("/upload/", "/upload/q_auto,f_auto,e_improve/");
}

export function resolveImage(images: ImageRecord[], label: string, fallbackIndex: number): string {
  const cloudUrl = getImageByLabel(images, label);
  if (cloudUrl) return applyCloudinaryEnhancements(cloudUrl);
  return LOCAL_IMAGES[fallbackIndex % LOCAL_IMAGES.length];
}
