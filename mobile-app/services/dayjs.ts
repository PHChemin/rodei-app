import dayjs from "dayjs";

import "dayjs/locale/pt-br";
dayjs.locale("pt-br");

import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export default dayjs;
