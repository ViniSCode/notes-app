import * as Tabs from "@radix-ui/react-tabs";

export function ImageUploadTab() {
  return (
    <Tabs.Root
      className="absolute flex flex-col w-[300px] shadow"
      defaultValue="tab1"
    >
      <Tabs.List
        className="shrink-0 flex border-b border-zinc-500"
        aria-label="Manage your account"
      >
        <Tabs.Trigger
          className="data-[state=active]:cursor-default cursor-pointer bg-zinc-900 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-zinc-50 select-none first:rounded-tl-md last:rounded-tr-md hover:text-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-none outline-none"
          value="tab1"
        >
          Upload
        </Tabs.Trigger>
        <Tabs.Trigger
          className="data-[state=active]:cursor-default cursor-pointer bg-zinc-900 px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-zinc-50 select-none first:rounded-tl-md last:rounded-tr-md hover:text-blue-500 data-[state=active]:text-blue-500 data-[state=active]:shadow-none data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-none outline-none"
          value="tab2"
        >
          Embed Link
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        className="grow p-5 bg-zinc-900 rounded-b-md outline-none focus:shadow-none"
        value="tab1"
      >
        <p className="mb-5 text-zinc-50 text-[15px] leading-normal">
          Make changes to your account here. Click save when you're done.
        </p>
        <fieldset className="mb-[15px] w-full flex flex-col justify-start">
          <label
            className="text-[13px] leading-none mb-2.5 text-zinc-400 block"
            htmlFor="link"
          >
            Name
          </label>
          <input
            className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-zinc-50 shadow h-[35px] focus:shadow-none outline-none"
            id="link"
            placeholder="Paste the image link"
            onChange={() => {}}
            // value={"https://"}
          />
        </fieldset>
        <div className="flex justify-end mt-5">
          <button className="cursor-pointer inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-zinc-50 hover:bg-zinc-700 focus:shadow-none outline-none">
            Save changes
          </button>
        </div>
      </Tabs.Content>
      <Tabs.Content
        className="grow p-5 bg-zinc-900 rounded-b-md outline-none focus:shadow-none"
        value="tab2"
      >
        <p className="mb-5 text-zinc-50 text-[15px] leading-normal">
          Change your password here. After saving, you'll be logged out.
        </p>
        <fieldset className="mb-[15px] w-full flex flex-col justify-start">
          <label
            className="text-[13px] leading-none mb-2.5 text-violet12 block"
            htmlFor="currentPassword"
          >
            Current password
          </label>
          <input
            className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue-500 shadow h-[35px] focus:shadow-none outline-none"
            id="currentPassword"
            type="password"
          />
        </fieldset>
        <fieldset className="mb-[15px] w-full flex flex-col justify-start">
          <label
            className="text-[13px] leading-none mb-2.5 text-violet12 block"
            htmlFor="newPassword"
          >
            New password
          </label>
          <input
            className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue-500 shadow h-[35px] focus:shadow-none outline-none"
            id="newPassword"
            type="password"
          />
        </fieldset>
        <fieldset className="mb-[15px] w-full flex flex-col justify-start">
          <label
            className="text-[13px] leading-none mb-2.5 text-violet12 block"
            htmlFor="confirmPassword"
          >
            Confirm password
          </label>
          <input
            className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-blue-500 shadow h-[35px] focus:shadow-none outline-none"
            id="confirmPassword"
            type="password"
          />
        </fieldset>
        <div className="flex justify-end mt-5">
          <button className="cursor-pointer inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-zinc-50 hover:bg-zinc-700 focus:shadow-none outline-none">
            Change password
          </button>
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
}
