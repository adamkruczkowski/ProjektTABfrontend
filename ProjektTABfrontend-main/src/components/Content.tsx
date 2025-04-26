const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center flex-grow ">
      <div className="flex flex-1 flex-col w-full items-center max-w-5xl ">
        {children}
      </div>
    </div>
  );
};

export default Content;
