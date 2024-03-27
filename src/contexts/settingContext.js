import { createContext } from "react";

const SettingContext = createContext({ state: {}, dispatch: () => {} });
export default SettingContext;
