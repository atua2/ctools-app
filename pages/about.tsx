// pages/about.tsx

import { ReactNode, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

interface SectionProps {
  title: string
  children: ReactNode
}

function Section({ title, children }: SectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-12"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-3">{title}</h2>
      <p className="text-base sm:text-lg leading-relaxed">{children}</p>
    </motion.div>
  )
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-16 px-4">
      {/* Back link */}
      <Link href="/" className="absolute top-6 left-6 bg-white/10 p-2 rounded hover:bg-white/20">
        ← Back to Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-extrabold mb-8"
        >
          About CTools
        </motion.h1>

        <Section title="Our Mission">
          CTools empowers the crypto community to revive abandoned or rug-pulled tokens by turning them
          into community-led opportunities. Through discovery, voting, project takeovers, and a
          points-to-token reward system, we give value back to tokens once left for dead.
        </Section>

        <Section title="The Problem: Broken Trust & Lost Potential">
          Across Ethereum, Solana, Binance Smart Chain and more, hundreds of tokens launch daily — and most
          crash. Whether due to scams or a lack of promotion resources, many projects are abandoned,
          leaving investors with nothing. According to{' '}
          <a
            href="https://www.chainalysis.com/blog/crypto-crime-report-2023"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold text-indigo-400"
          >
            Chainalysis
          </a>
          , scams and rug pulls drained over <strong>$7 billion</strong> in 2022 alone.
        </Section>

        <Section title="How CTools Makes a Difference">
          Our platform allows users to submit dead tokens, vote on which deserve revival, and even take
          over projects as “CTOs.” CTools then supports the top 3 community-selected tokens with DEX updates,
          promotional boosts, and buybacks — breathing life back into assets that deserve it.
        </Section>

        <Section title="Our Rewards & Points System">
          We reward community action. Submitting forgotten tokens, voting, reviving projects, and growing
          market caps all earn points. These points later convert into $CTOOLS, our utility and governance
          token. The more you contribute, the more you earn — and the more projects we revive together.
        </Section>

        <Section title="Join Us">
          CTools is rebuilding crypto from the ground up — restoring trust, empowering users, and creating a
          space where abandoned projects get a second chance. Whether you’re a hunter of forgotten tokens
          or a visionary ready to take one on, CTools welcomes you.
        </Section>
      </div>
    </div>
  )
}
