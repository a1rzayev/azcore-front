import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Services } from "@/components/Services";
import { SupportPlans } from "@/components/SupportPlans";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";

export default function Home() {
  return (
    <Container>
      <Hero />

      <SectionTitle
        preTitle="What We Do"
        title="Comprehensive IT Solutions"
      >
        From web development to network infrastructure, AzCore OutSource covers
        every aspect of your business technology needs with professional
        expertise and reliable support.
      </SectionTitle>

      <Services />

      <SectionTitle preTitle="Flexible Plans" title="One-Time & Monthly Support">
        Choose the support model that fits your business — whether you need a
        one-time project or ongoing monthly partnership, we deliver results.
      </SectionTitle>

      <SupportPlans />

      <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
        Find answers to common questions about our services, support plans, and
        how AzCore OutSource can help your business grow.
      </SectionTitle>

      <Faq />
      <Cta />
    </Container>
  );
}
