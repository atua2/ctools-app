// pages/whitepaper.tsx

import { ReactNode } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface SectionProps {
  title: string
  children: ReactNode
}

function Section({ title, children }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-12"
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="text-gray-300 leading-relaxed">{children}</div>
    </motion.div>
  )
}

export default function WhitepaperPage() {
  return (
    <div className="relative pt-20 bg-black text-white min-h-screen px-4 py-10">
      {/* Back to Home */}
      <Link
        href="/"
        className="absolute top-4 left-4 text-white bg-white/10 p-2 rounded hover:bg-white/20"
      >
        ← Home
      </Link>

      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl font-extrabold mb-8 text-center"
        >
          Whitepaper
        </motion.h1>

        <Section title="1. Introduction">
          In 2023, crypto scams caused over $5.6 billion in global losses. TokenRevive
          was created to reverse this trend by enabling token recovery through
          community‐led takeovers.
        </Section>

        <Section title="2. Vision">
          We empower communities to revive abandoned tokens, rebuild trust, and give
          legitimate projects a second chance—using decentralized power and structured
          recovery tools.
        </Section>

        <Section title="3. Community Takeovers (CTOs)">
          <p>
            TokenRevive offers two revival pathways:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-300">
            <li>
              <strong>Submit for Voting:</strong> Anyone can nominate a token. The
              community votes, and the top 3 receive direct support.
            </li>
            <li>
              <strong>Apply to Lead a CTO:</strong> Individuals apply to manage
              revival efforts and earn points based on success.
            </li>
          </ul>
          <p className="mt-4">
            Support may include supply burns, contract upgrades, rebranding, liquidity
            assistance, and marketing campaigns.
          </p>
        </Section>

        <Section title="4. Points & Rewards">
          CTO leaders earn points for milestones like market cap growth, verified DEX
          listings, and community engagement. Points convert to the TokenRevive utility
          token and may also unlock perks, tiered roles, or governance power in the
          future DAO.
        </Section>

        <Section title="5. Roadmap">
          <ul className="list-disc pl-5 space-y-2">
            <li>✅ MVP Launch (portal, listing system, backend)</li>
            <li>✅ Telegram Bot for submissions + alerts</li>
            <li>🔜 First CTO Executions (top‐voted projects)</li>
            <li>🔜 Point Redemption + Utility Token Launch</li>
            <li>🔜 DAO Governance Rollout</li>
            <li>🔜 Mini CTO Lead Exchange Marketplace</li>
          </ul>
        </Section>

        <Section title="6. Conclusion">
          TokenRevive turns failure into opportunity. By empowering the community to
          take charge of recovery, we bring accountability, transparency, and second
          chances to crypto—rebuilding what rug pulls tried to destroy.
        </Section>
      </div>
    </div>
  )
}
