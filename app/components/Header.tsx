import Link from 'next/link'

export default function Header() {
  return (
    <nav>
      <ul>
        <span>
          <li>
            <Link href="/machinelearning">
              <a>Machine Learning</a>
            </Link>
          </li>
        </span>
        <span>
          <li>
            <Link href="/deeplearning">
              <a>Deep Learning</a>
            </Link>
          </li>
        </span>
        <span>
          <li>
            <Link href="/reinforcementlearning">
              <a>Reinforcement Learning</a>
            </Link>
          </li>
        </span>
      </ul>
    </nav>
  )
}
