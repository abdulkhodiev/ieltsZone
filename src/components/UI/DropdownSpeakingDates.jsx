import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import dayjs from "dayjs";

const DropdownSpeakingDates = ({
    availableSpeakingTimes,
    setSpeakingDateId,
}) => {
    const handleChange = (event, newValue) => {
        if (newValue) {
            setSpeakingDateId(newValue);
        }
    };

    return (
        <Select
            sx={{
                marginY: "1rem",
            }}
            onChange={handleChange}
            placeholder="Select Speaking Time"
            required
        >
            {availableSpeakingTimes.map((time) => (
                <Option key={time.id} value={time.id}>
                    {dayjs(time.date).format("HH:mm | DD MMM YYYY")}
                </Option>
            ))}
        </Select>
    );
};

export default DropdownSpeakingDates;
