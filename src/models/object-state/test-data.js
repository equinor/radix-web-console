import { faTheRedYeti } from "@fortawesome/free-brands-svg-icons";
import { ReactReduxContext } from "react-redux";

export default [
  {
    __testDescription: 'Valid event - empty',
  },
  {
    __testDescription: 'Valid event with pod',
    pod: {
      ready: true,
      started: true,
      restartCount: 0,
    },
  },
];
