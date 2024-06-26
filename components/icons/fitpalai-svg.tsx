import { FC } from "react"

interface FitpalAISVGProps {
  theme: "dark" | "light"
  scale?: number
}

export const FitpalAISVG: FC<FitpalAISVGProps> = ({ theme, scale = 1 }) => {
  return (
    <svg
      width={189 * scale}
      height={194 * scale}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      zoomAndPan="magnify"
      viewBox="0 0 375 374.999991"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <path
        fill="#A855F7"
        d="M 88.308594 289.570312 L 89.964844 291.210938 L 90.132812 291.375 C 95.292969 296.722656 95.238281 305.332031 89.964844 310.601562 C 84.695312 315.875 76.085938 315.929688 70.742188 310.769531 L 70.574219 310.601562 L 68.914062 308.960938 L 64.398438 304.425781 C 59.074219 299.101562 59.074219 290.382812 64.398438 285.035156 C 69.726562 279.707031 78.464844 279.707031 83.792969 285.035156 Z M 179.773438 214.546875 L 181.378906 212.941406 L 183.21875 211.097656 L 200.125 194.195312 C 205.449219 188.867188 205.449219 180.148438 200.125 174.804688 C 194.777344 169.476562 186.058594 169.476562 180.730469 174.804688 L 161.984375 193.550781 L 160.382812 195.15625 L 150.6875 204.851562 C 145.359375 210.179688 145.359375 218.898438 150.6875 224.242188 L 160.382812 233.9375 L 162.113281 235.652344 L 180.859375 254.398438 C 186.1875 259.726562 194.90625 259.726562 200.253906 254.398438 C 205.582031 249.070312 205.582031 240.335938 200.253906 235.007812 L 181.507812 216.261719 Z M 65.171875 174.933594 L 65.171875 174.914062 C 70.5 169.585938 79.238281 169.585938 84.566406 174.914062 L 199.996094 290.363281 C 205.339844 295.691406 205.339844 304.425781 199.996094 309.753906 C 194.667969 315.082031 185.949219 315.082031 180.601562 309.753906 L 65.171875 194.308594 C 59.847656 188.980469 59.847656 180.261719 65.171875 174.933594 Z M 65.007812 230.195312 C 70.335938 224.871094 79.054688 224.871094 84.398438 230.195312 L 144.730469 290.527344 C 150.058594 295.855469 150.058594 304.59375 144.730469 309.921875 C 139.386719 315.246094 130.667969 315.246094 125.339844 309.921875 L 106.59375 291.171875 L 78.152344 262.730469 L 65.007812 249.589844 C 59.679688 244.261719 59.679688 235.523438 65.007812 230.195312 Z M 65.007812 230.195312 "
        fill-opacity="1"
        fill-rule="evenodd"
      />
      <path
        fill="#A855F7"
        d="M 274.019531 98.441406 L 272.378906 96.820312 L 272.214844 96.65625 C 267.109375 91.367188 267.164062 82.851562 272.378906 77.636719 C 277.59375 72.421875 286.109375 72.367188 291.398438 77.472656 L 291.5625 77.636719 L 293.203125 79.261719 L 297.667969 83.746094 C 302.9375 89.015625 302.9375 97.640625 297.667969 102.925781 C 292.398438 108.195312 283.757812 108.195312 278.488281 102.925781 Z M 183.542969 172.652344 L 180.132812 176.0625 L 163.414062 192.785156 C 158.144531 198.054688 158.144531 206.675781 163.414062 211.964844 C 168.703125 217.234375 177.328125 217.234375 182.597656 211.964844 L 212.316406 182.246094 C 217.585938 176.972656 217.585938 168.351562 212.316406 163.0625 L 202.726562 153.472656 L 201.011719 151.777344 L 182.46875 133.230469 C 177.199219 127.960938 168.574219 127.960938 163.285156 133.230469 C 158.015625 138.5 158.015625 147.144531 163.285156 152.414062 L 181.832031 170.957031 Z M 296.902344 211.835938 L 296.902344 211.855469 C 291.632812 217.125 282.992188 217.125 277.722656 211.855469 L 163.542969 97.65625 C 158.253906 92.386719 158.253906 83.746094 163.542969 78.476562 C 168.8125 73.207031 177.4375 73.207031 182.722656 78.476562 L 296.902344 192.675781 C 302.171875 197.945312 302.171875 206.566406 296.902344 211.835938 Z M 297.066406 157.171875 C 291.796875 162.441406 283.171875 162.441406 277.886719 157.171875 L 264.886719 144.171875 L 236.75 116.039062 L 218.207031 97.492188 C 212.9375 92.222656 212.9375 83.582031 218.207031 78.3125 C 223.496094 73.042969 232.117188 73.042969 237.386719 78.3125 L 255.933594 96.855469 L 284.066406 124.988281 L 297.066406 137.992188 C 302.335938 143.261719 302.335938 151.902344 297.066406 157.171875 Z M 297.066406 157.171875 "
        fill-opacity="1"
        fill-rule="evenodd"
      />
    </svg>
  )
}
