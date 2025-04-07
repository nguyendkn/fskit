import React from 'react';

const AvatarName = ({
  name,
  size = 40,
  bgColor,
}: {
  name: string;
  size?: number;
  bgColor?: string;
}) => {
  // Lấy chữ cái đầu tiên của tên
  const initial = name ? name.charAt(0).toUpperCase() : '';

  // Tạo màu ngẫu nhiên nếu không có màu được truyền vào

  return (
    <div
      className='size-7 rounded-full flex items-center justify-center font-bold text-white bg-primary text-md'
      style={{
        fontFamily: 'sans-serif',
      }}
    >
      {initial}
    </div>
  );
};

export default AvatarName;
