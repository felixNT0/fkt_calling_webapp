"use client";
import { ShareAltOutlined, CopyOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, message } from "antd";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
const DropdownMenu = ({ id, title }: any) => {
  const url = `${typeof window !== 'undefined' ? window.location.origin : 'https://fkt-calling-app.vercel.app'}/${id}/join`;
  const items: MenuProps["items"] = [
    {
      label: (
        <>
          <FacebookShareButton url={`${url}`}>
            <FacebookIcon size={33} round />
          </FacebookShareButton>
        </>
      ),
      key: "0",
    },
    {
      type: "divider",
    },
    {
      label: (
        <>
          <TwitterShareButton url={`${url}`} title={title}>
            <TwitterIcon size={33} round />
          </TwitterShareButton>
        </>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <>
          <WhatsappShareButton url={`${url}`} title={title}>
            <WhatsappIcon size={33} round />
          </WhatsappShareButton>
        </>
      ),
      key: "3",
    },
    {
      type: "divider",
    },
    {
      label: (
        <>
          <TelegramShareButton url={`${url}`} title={title}>
            <TelegramIcon size={33} round />
          </TelegramShareButton>
        </>
      ),
      key: "4",
    },
    {
      type: "divider",
    },
    {
      label: (
        <>
          <CopyToClipboard text={url} onCopy={() => message.info("copied")}>
            <CopyOutlined className="cursor-pointer text-[30px] text-center" />
          </CopyToClipboard>
        </>
      ),
      key: "5",
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <ShareAltOutlined className="cursor-pointer text-[20px]" />
    </Dropdown>
  );
};

export default DropdownMenu;
