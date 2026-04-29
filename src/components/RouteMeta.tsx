import { useEffect } from "react";

// ═══════════════════════════════════════════════════════════
// RouteMeta — sync document.title + meta tags par route SPA
// Restaure les valeurs précédentes au démontage pour qu'un
// retour sur la home reprenne les meta de index.html.
// ═══════════════════════════════════════════════════════════

interface RouteMetaProps {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  noindex?: boolean;
}

function setOrUpdateMeta(
  selector: string,
  attr: "name" | "property",
  attrValue: string,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function RouteMeta({ title, description, ogTitle, ogDescription, noindex }: RouteMetaProps) {
  useEffect(() => {
    const previousTitle = document.title;
    const previousDescription =
      document.head.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? "";
    const previousOgTitle =
      document.head.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.content ?? "";
    const previousOgDescription =
      document.head.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.content ??
      "";
    const previousRobots =
      document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')?.content ?? "";

    document.title = title;
    if (description) {
      setOrUpdateMeta('meta[name="description"]', "name", "description", description);
    }
    setOrUpdateMeta('meta[property="og:title"]', "property", "og:title", ogTitle ?? title);
    if (ogDescription || description) {
      setOrUpdateMeta(
        'meta[property="og:description"]',
        "property",
        "og:description",
        ogDescription ?? description ?? "",
      );
    }
    if (noindex) {
      setOrUpdateMeta('meta[name="robots"]', "name", "robots", "noindex, nofollow");
    }

    return () => {
      document.title = previousTitle;
      if (previousDescription) {
        setOrUpdateMeta('meta[name="description"]', "name", "description", previousDescription);
      }
      if (previousOgTitle) {
        setOrUpdateMeta('meta[property="og:title"]', "property", "og:title", previousOgTitle);
      }
      if (previousOgDescription) {
        setOrUpdateMeta(
          'meta[property="og:description"]',
          "property",
          "og:description",
          previousOgDescription,
        );
      }
      if (previousRobots) {
        setOrUpdateMeta('meta[name="robots"]', "name", "robots", previousRobots);
      }
    };
  }, [title, description, ogTitle, ogDescription, noindex]);

  return null;
}
