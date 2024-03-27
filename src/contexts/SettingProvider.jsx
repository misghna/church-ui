import PropTypes from "prop-types";

import useMenu from "~/hooks/useSetting";

import SettingContext from "./settingContext";

const url = "28912ddd5410287eb4c0";
const SettingProvider = ({ children }) => {
  const { state, dispatch } = useMenu(url);
  return <SettingContext.Provider value={{ state, dispatch }}>{children}</SettingContext.Provider>;
};
SettingProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default SettingProvider;
