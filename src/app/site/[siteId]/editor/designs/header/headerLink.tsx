import { Link as LinkType, SubLink } from "@/types/sectionsTypes/header";
import Link from "next/link";
import { useParams } from "next/navigation";

interface HeaderLinkProps {
  link: LinkType | SubLink;
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ link }) => {
  const { siteId } = useParams();

  return (
    <Link
      key={link.id}
      href={link.pageId ? `/site/${siteId}/editor/${link.pageId}` : "#"}
      {...(link.pageId ? {} : { onClick: (e) => e.preventDefault() })}
    >
      {link.text}
    </Link>
  );
};
