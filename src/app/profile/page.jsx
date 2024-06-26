import { Suspense } from "react";
import Link from "next/link";
import CreateProfileForm from "@app/components/forms/CreateProfileForm";

const Page = () => {
  return (
    <>
      <div className='content'>
        <div className='row'>
          <div className='col-sm-7 col-6'>
            <ul className='breadcrumb'>
              <li className='breadcrumb-item'>
                <Link href='/#'>Demographics </Link>
              </li>
            </ul>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <CreateProfileForm />
        </Suspense>
      </div>
    </>
  );
};

export default Page;
