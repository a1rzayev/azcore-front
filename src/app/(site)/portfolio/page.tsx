import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { PortfolioSlideshow } from "@/components/PortfolioSlideshow";
import { prisma } from "@/lib/prisma";

async function getProjects() {
  return prisma.portfolioProject.findMany({
    orderBy: { order: "asc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
}

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <Container>
      <SectionTitle
        preTitle="Our Work"
        title="Portfolio"
        align="center"
      >
        Explore our projects and see how we deliver results for our clients.
      </SectionTitle>

      {projects.length > 0 ? (
        <PortfolioSlideshow projects={projects} />
      ) : (
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          No portfolio projects yet. Check back soon!
        </div>
      )}
    </Container>
  );
}
