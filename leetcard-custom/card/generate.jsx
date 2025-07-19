import React from "react";
import fs from 'fs';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const STATS_PATH = './card/stats.json';
const OUTPUT_PATH = './card/output_node.png';
const BADGE_PATH = './card/badge.png';

function loadStats() {
  try {
    return JSON.parse(fs.readFileSync(STATS_PATH, 'utf-8'));
  } catch {
    return {
      matchedUser: {
        username: 'lapor',
        profile: { ranking: 24131, realName: 'Your Name' },
        submitStatsGlobal: {
          acSubmissionNum: [
            { difficulty: 'All', count: 966 },
            { difficulty: 'Easy', count: 322 },
            { difficulty: 'Medium', count: 527 },
            { difficulty: 'Hard', count: 117 }
          ]
        }
      },
      allQuestionsCount: [
        { difficulty: 'All', count: 883+1867+845 },
        { difficulty: 'Easy', count: 883 },
        { difficulty: 'Medium', count: 1867 },
        { difficulty: 'Hard', count: 845 }
      ],
      totalUsers: 1000000, // Add a dummy total users for rank
      contest: {
        rating: 2046,
        highestRating: 2046,
        percentile: 2.04,
        history: [
          1500, 1550, 1600, 1700, 1800, 1900, 2000, 2046, 2046, 2046
        ]
      }
    };
  }
}

function CircularProgress({ percent, size = 120, stroke = 10, color = '#FFB400' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = percent * c;
  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#eee" strokeWidth={stroke} />
      <circle
        cx={size/2}
        cy={size/2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={`${dash} ${c-dash}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${size/2} ${size/2})`}
      />
    </svg>
  );
}

const stats = loadStats();
const user = stats.matchedUser;
const solved = Object.fromEntries((user.submitStatsGlobal.acSubmissionNum || []).map(d => [d.difficulty, d.count]));
const total = Object.fromEntries((stats.allQuestionsCount || []).map(d => [d.difficulty, d.count]));
const realName = user.profile.realName || user.username;
const rank = user.profile.ranking;
const totalUsers = stats.totalUsers || 1000000;

const LABEL_BAR_GAP = 32;
const MEDIUM_LABEL_EXTRA_GAP = 32;

const Card = (
  <div style={{
    width: 700, height: 360, background: '#fff', fontFamily: 'sans-serif', borderRadius: 18, border: '2px solid #eee', display: 'flex', flexDirection: 'column', padding: 24, boxSizing: 'border-box', alignItems: 'center', justifyContent: 'flex-start'
  }}>
    {/* Name at the top, prefixed with rank string */}
    <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 16, justifyContent: 'center' }}>
      <img src="https://leetcode.com/static/images/LeetCode_logo_rvs.png" width={32} height={32} style={{ marginRight: 10 }} />
      <span style={{ fontSize: 28, fontWeight: 700 }}>{realName}</span>
    </div>
    {/* Centered circular progress */}
    <div style={{ width: 100, height: 100, position: 'relative', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress percent={solved.All/total.All} size={100} stroke={8} color="#FFB400" />
      <span style={{
        position: 'absolute',
        left: 0, top: 0, width: 100, height: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 30, fontWeight: 700, color: '#222'
      }}>{solved.All}</span>
    </div>
    {/* Labels below the circle, x/y on a straight line */}
    <div style={{ width: '100%', marginTop: 24, display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center' }}>
      {['Easy','Medium','Hard'].map((diff, i) => (
        <div key={diff} style={{ display: 'flex', alignItems: 'center', gap: 8, width: 340, justifyContent: 'center' }}>
          <span style={{ color: [ '#4caf50', '#ffc107', '#f44336' ][i], fontWeight: 600, fontSize: 18, width: 70, textAlign: 'right', marginRight: diff === 'Medium' ? LABEL_BAR_GAP + MEDIUM_LABEL_EXTRA_GAP : LABEL_BAR_GAP }}>{diff}</span>
          <div style={{ background: '#eee', borderRadius: 8, height: 10, width: 160, marginRight: 8, overflow: 'hidden', display: 'flex' }}>
            <div style={{ background: [ '#4caf50', '#ffc107', '#f44336' ][i], width: `${100*(solved[diff]/total[diff]||0)}%`, height: 10, borderRadius: 8 }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#222', minWidth: 60, textAlign: 'right' }}>{solved[diff]}/{total[diff]}</span>
        </div>
      ))}
    </div>
    {/* Rank at the bottom right as x/totalUsers */}
    <div style={{ width: '100%', marginTop: 18, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
      <span style={{ fontSize: 14, color: '#888', marginRight: 6 }}>Rank</span>
      <span style={{ fontSize: 18, fontWeight: 700 }}>{rank}/{totalUsers}</span>
    </div>
  </div>
);

const svg = await satori(Card, {
  width: 700,
  height: 360,
  fonts: [
    {
      name: 'DejaVuSans',
      data: fs.readFileSync('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'),
      weight: 700,
      style: 'normal',
    },
  ],
});

const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: 700 } });
const pngData = resvg.render().asPng();
fs.writeFileSync(OUTPUT_PATH, pngData);
console.log(`✅ Node.js card saved to ${OUTPUT_PATH}`);
