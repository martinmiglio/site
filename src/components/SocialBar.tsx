import SocialIcon from "./SocialIcon";

const SocialBar = ({ contentList }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {contentList.map((item) => (
        <SocialIcon
          key={item.contactContent}
          contactContent={item.contactContent}
          contactLink={item.contactLink}
        />
      ))}
    </div>
  );
};

export default SocialBar;
