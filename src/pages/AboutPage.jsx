import AboutHero from '../components/about/AboutHero'
import MissionQuote from '../components/about/MissionQuote'
import BlueprintTimeline from '../components/about/BlueprintTimeline'
import ValuesGrid from '../components/about/ValuesGrid'
import StatsRow from '../components/landing/StatsRow'

export default function AboutPage() {
  return (
    <div className="pt-24">
      <AboutHero />
      <MissionQuote />
      <BlueprintTimeline />
      <div className="bg-slate-900">
        <StatsRow />
      </div>
      <ValuesGrid />
    </div>
  )
}
