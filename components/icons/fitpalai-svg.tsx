import { FC } from "react"

interface FitpalAISVGProps {
  theme: "dark"
  scale?: number
}

export const FitpalAISVG: FC<FitpalAISVGProps> = ({
  theme = "dark",
  scale = 1
}) => {
  return (
    <svg
      width={189 * scale}
      className={`fill-${theme === "dark" ? "purple" : "black"}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      zoomAndPan="magnify"
      viewBox="0 0 375 374.999991"
      height="500"
      preserveAspectRatio="xMidYMid meet"
      version="1.0"
    >
      <defs>
        <clipPath id="ce0d884aa8">
          <path
            d="M 2 160 L 210 160 L 210 367 L 2 367 Z M 2 160 "
            clip-rule="nonzero"
          />
        </clipPath>
        <clipPath id="a64dcd6d05">
          <path
            d="M 0.00390625 362.789062 L 7.488281 157.425781 L 212.851562 164.910156 L 205.367188 370.273438 Z M 0.00390625 362.789062 "
            clip-rule="nonzero"
          />
        </clipPath>
        <clipPath id="78e4f36d89">
          <path
            d="M 0.00390625 362.789062 L 7.488281 157.425781 L 212.851562 164.910156 L 205.367188 370.273438 Z M 0.00390625 362.789062 "
            clip-rule="nonzero"
          />
        </clipPath>
      </defs>
      <path
        fill="#ffffff"
        d="M 333.96875 37.921875 L 331.640625 35.621094 L 331.40625 35.386719 C 324.164062 27.886719 324.242188 15.804688 331.640625 8.40625 C 339.039062 1.007812 351.117188 0.933594 358.621094 8.175781 L 358.851562 8.40625 L 361.179688 10.710938 L 367.519531 17.074219 C 374.992188 24.550781 374.992188 36.785156 367.519531 44.289062 C 360.042969 51.761719 347.78125 51.761719 340.304688 44.289062 Z M 205.609375 143.207031 L 203.359375 145.457031 L 200.769531 148.042969 L 177.050781 171.765625 C 169.574219 179.242188 169.574219 191.476562 177.050781 198.980469 C 184.550781 206.457031 196.789062 206.457031 204.261719 198.980469 L 246.429688 156.8125 C 253.90625 149.339844 253.90625 137.101562 246.429688 129.601562 L 232.820312 115.992188 L 230.390625 113.589844 L 204.082031 87.28125 C 196.605469 79.804688 184.371094 79.804688 176.867188 87.28125 C 169.394531 94.757812 169.394531 107.019531 176.867188 114.492188 L 203.175781 140.800781 Z M 366.433594 198.796875 L 366.433594 198.824219 C 358.957031 206.300781 346.695312 206.300781 339.21875 198.824219 L 177.230469 36.8125 C 169.730469 29.335938 169.730469 17.074219 177.230469 9.597656 C 184.707031 2.121094 196.941406 2.121094 204.445312 9.597656 L 366.433594 171.609375 C 373.90625 179.085938 373.90625 191.324219 366.433594 198.796875 Z M 366.664062 121.246094 C 359.1875 128.722656 346.953125 128.722656 339.449219 121.246094 L 321.007812 102.800781 L 254.785156 36.578125 C 247.308594 29.101562 247.308594 16.839844 254.785156 9.363281 C 262.285156 1.890625 274.523438 1.890625 281.996094 9.363281 L 366.664062 94.03125 C 374.140625 101.507812 374.140625 113.769531 366.664062 121.246094 Z M 366.664062 121.246094 "
        fill-opacity="1"
        fill-rule="evenodd"
      />
      <g clip-path="url(#ce0d884aa8)">
        <g clip-path="url(#a64dcd6d05)">
          <g clip-path="url(#78e4f36d89)">
            <path
              fill="#ffffff"
              d="M 42.269531 327.378906 L 44.507812 329.761719 L 44.730469 330 C 51.683594 337.746094 51.167969 349.792969 43.519531 356.902344 C 35.871094 364.015625 23.820312 363.652344 16.597656 356.15625 L 16.375 355.914062 L 14.136719 353.535156 L 8.046875 346.957031 C 0.863281 339.226562 1.308594 327.023438 9.035156 319.8125 C 16.765625 312.628906 28.996094 313.074219 36.179688 320.800781 Z M 174.125 227.035156 L 176.453125 224.871094 L 179.125 222.386719 L 203.648438 199.585938 C 211.375 192.402344 211.820312 180.199219 204.636719 172.445312 C 197.425781 164.714844 185.222656 164.269531 177.496094 171.453125 L 152.972656 194.253906 L 150.296875 196.738281 L 147.972656 198.902344 L 133.90625 211.980469 C 126.175781 219.164062 125.730469 231.367188 132.914062 239.121094 L 145.992188 253.1875 L 148.332031 255.675781 L 173.613281 282.871094 C 180.800781 290.601562 193.003906 291.046875 200.757812 283.863281 C 208.484375 276.675781 208.929688 264.449219 201.746094 256.71875 L 176.464844 229.523438 Z M 15.738281 165.738281 L 15.738281 165.714844 C 23.46875 158.527344 35.699219 158.976562 42.882812 166.703125 L 198.5625 334.1875 C 205.773438 341.917969 205.324219 354.148438 197.570312 361.332031 C 189.84375 368.515625 177.640625 368.070312 170.429688 360.339844 L 14.75 192.855469 C 7.566406 185.128906 8.007812 172.925781 15.738281 165.738281 Z M 12.6875 243.085938 C 20.414062 235.898438 32.617188 236.34375 39.828125 244.074219 L 57.554688 263.140625 L 95.914062 304.402344 L 121.199219 331.601562 C 128.382812 339.328125 127.9375 351.558594 120.210938 358.742188 C 112.457031 365.925781 100.25 365.484375 93.066406 357.753906 L 67.785156 330.558594 L 29.421875 289.292969 L 11.695312 270.226562 C 4.511719 262.5 4.957031 250.269531 12.6875 243.085938 Z M 12.6875 243.085938 "
              fill-opacity="1"
              fill-rule="evenodd"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}
