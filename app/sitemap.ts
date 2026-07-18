import type { MetadataRoute } from "next";
import { motorcycles } from "@/data/motorcycles";
import { cars } from "@/data/cars";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const now = new Date();

  const staticRoutes = ["", "/motocikli", "/avtomobili", "/za-nas", "/kontakt"].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const motoRoutes = motorcycles.map((m) => ({
    url: `${base}/motocikli/${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const carRoutes = cars.map((c) => ({
    url: `${base}/avtomobili/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...motoRoutes, ...carRoutes];
}
