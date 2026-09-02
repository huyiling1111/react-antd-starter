/** 占位 Logo：蓝色渐变圆角方块 + 白色菱形。替换成你自己的品牌图形即可。 */
export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect x="1" y="1" width="30" height="30" rx="8" fill="url(#app-logo)" />
      <rect
        x="16"
        y="8"
        width="11.3"
        height="11.3"
        rx="2"
        transform="rotate(45 16 8)"
        fill="#fff"
      />
      <defs>
        <linearGradient
          id="app-logo"
          x1="1"
          y1="1"
          x2="31"
          y2="31"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4b8bff" />
          <stop offset="1" stopColor="#2b6cff" />
        </linearGradient>
      </defs>
    </svg>
  )
}
