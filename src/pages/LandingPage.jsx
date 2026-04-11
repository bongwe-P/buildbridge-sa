// src/pages/LandingPage.jsx
import HeroSplit from '../components/landing/HeroSplit'
import StatsRow from '../components/landing/StatsRow'
import ProblemSolution from '../components/landing/ProblemSolution'
import HorizontalCategories from '../components/landing/HorizontalCategories'
import FeaturedListings from '../components/landing/FeaturedListings'
import HowItWorks from '../components/landing/HowItWorks'
import SupplierCTA from '../components/landing/SupplierCTA'

export default function LandingPage() {
  return (
    <>
      <HeroSplit />
      <StatsRow />
      <ProblemSolution />
      <HorizontalCategories />
      <FeaturedListings />
      <HowItWorks />
      <SupplierCTA />
    </>
  )
}
