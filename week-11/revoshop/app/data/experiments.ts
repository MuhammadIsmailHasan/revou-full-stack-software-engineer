import Exercise from "../d5/exercise";
import ControlledHandOn1 from "../d5/hands-on-1";
import ControlledHandOn2 from "../d5/hands-on-2";
import { ContentId } from "./contents";

export const experiments: Record<ContentId, React.ComponentType> = {
	"control-1": ControlledHandOn1,
	"control-2": ControlledHandOn2,
	"control-3": Exercise,
};
