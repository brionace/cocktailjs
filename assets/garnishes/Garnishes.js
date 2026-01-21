import { Circle, Path, Rect } from "react-native-svg";
import { theme, getStrokeColor } from "../../utils/theme";

export const Garnishes = {
  lemon: (
    <Circle
      cx={50}
      cy={8}
      r={6}
      fill={theme.colors.accent[500]}
      stroke={theme.colors.warning}
      strokeWidth={1}
    />
  ),
  lime: (
    <Circle
      cx={50}
      cy={8}
      r={6}
      fill={theme.colors.success}
      stroke={theme.colors.success}
      strokeWidth={1}
    />
  ),
  cherry: <Circle cx={48} cy={12} r={4} fill={theme.colors.error} />,
  mint: (
    <>
      <Path d="M12 28 L12 16" stroke={getStrokeColor()} strokeWidth={2} />
      {/* Leaves */}
      <Path
        d="M12 16 Q8 12 12 8 Q16 12 12 16"
        fill="#43a047"
        stroke={getStrokeColor()}
        strokeWidth={1}
      />
      <Path
        d="M12 18 Q6 20 8 26 Q14 22 12 18"
        fill="#66bb6a"
        stroke={getStrokeColor()}
        strokeWidth={1}
      />
    </>
  ),
  olive: (
    <Circle
      cx={50}
      cy={8}
      r={5}
      fill={theme.colors.dark[400]}
      stroke={theme.colors.dark[700]}
      strokeWidth={1}
    />
  ),
  orange: (
    <Circle
      cx={50}
      cy={8}
      r={6}
      fill={theme.colors.warning}
      stroke={theme.colors.warning}
      strokeWidth={1}
    />
  ),
  cucumber: (
    <Rect
      x={44}
      y={4}
      width={12}
      height={6}
      fill={theme.colors.success}
      stroke={theme.colors.dark[700]}
      strokeWidth={1}
      rx={3}
    />
  ),
  pineapple: (
    <Path
      d="M48 4 L52 12 L44 12 Z"
      fill={theme.colors.accent[200]}
      stroke={theme.colors.warning}
      strokeWidth={1}
    />
  ),
  raspberry: <Circle cx={48} cy={12} r={4} fill={theme.colors.error} />,
  blackberry: <Circle cx={48} cy={12} r={4} fill={theme.colors.dark[900]} />,
  strawberry: (
    <Path
      d="M48 8 Q50 4 52 8 Q50 12 48 8 Z"
      fill={theme.colors.error}
      stroke={theme.colors.dark[700]}
      strokeWidth={1}
    />
  ),
  basil: (
    <Path
      d="M46 6 C48 2, 52 2, 54 6 C52 10, 48 10, 46 6 Z"
      fill={theme.colors.success}
      stroke={theme.colors.dark[700]}
      strokeWidth={1}
    />
  ),
  rosemary: (
    <Path
      d="M46 6 C48 2, 52 2, 54 6 C52 10, 48 10, 46 6 Z"
      fill={theme.colors.success}
      stroke={theme.colors.dark[700]}
      strokeWidth={1}
    />
  ),
  cinnamon: (
    <Rect
      x={44}
      y={4}
      width={12}
      height={4}
      fill={theme.colors.warning}
      stroke={theme.colors.dark[700]}
      strokeWidth={1}
      rx={2}
    />
  ),
  peppercorn: <Circle cx={48} cy={12} r={2} fill={theme.colors.dark[700]} />,
  edibleFlower: (
    <Path
      d="M48 8 Q50 4 52 8 Q50 12 48 8 Z"
      fill={theme.colors.accent[200]}
      stroke={theme.colors.warning}
      strokeWidth={1}
    />
  ),
};
