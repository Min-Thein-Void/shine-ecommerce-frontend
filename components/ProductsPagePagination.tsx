"use client"; // ဒီ component ကို browser (Client Side) မှာ run မယ်

// Parent Component ကနေလက်ခံမယ့် props type
type Props = {
  currentPage: number; // လက်ရှိရောက်နေတဲ့ page number
  totalPages: number; // စုစုပေါင်း page အရေအတွက်
  onPageChange: (page: number) => void; // Page ပြောင်းတဲ့အခါ Parent ကိုအကြောင်းကြားမယ့် function
};

// Pagination UI Component
function ProductsPagePagination({
  currentPage, // လက်ရှိ page
  totalPages, // စုစုပေါင်း page
  onPageChange, // Parent ကပို့လာတဲ့ page change function
}: Props) {
  return (
    // Pagination Buttons တွေကို အလယ်မှာပြမယ့် container
    <div className="mt-10 flex items-center justify-center gap-2">

      {/* Previous Button */}
      <button

        // Page 1 ရောက်နေရင် Previous ကိုနှိပ်လို့မရအောင် Disable လုပ်ထားမယ်
        disabled={currentPage === 1}

        // Previous နှိပ်ရင် လက်ရှိ page ကနေ ၁ လျော့ပြီး Parent ကိုပို့မယ်
        onClick={() => onPageChange(currentPage - 1)}

        className="
        rounded-lg
        border
        px-4
        py-2
        text-sm
        disabled:cursor-not-allowed
        disabled:opacity-40
        hover:bg-gray-100
        "
      >
        Previous
      </button>

      {/* Number Buttons */}

      {/* Page အရေအတွက်အလိုက် Array တစ်ခုဖန်တီးမယ် */}
      {/* ဥပမာ totalPages = 5 */}

      {/* Array.from({ length: 5 }) */}

      {/* [empty, empty, empty, empty, empty] */}

      {/* (_, index) => index + 1 */}

      {/* [1, 2, 3, 4, 5] */}

      {/* ပြီးရင် map နဲ့ Button တစ်ခုချင်းဆွဲမယ် */}
      {Array.from(
        // Button ဘယ်နှခုဆွဲမလဲ
        { length: totalPages },

        // Index ကို Page Number ပြောင်းမယ်
        (_, index) => index + 1
      ).map(

        // Page Number တစ်ခုချင်းစီကို Button တည်ဆောက်မယ်
        (page) => (
          <button

            // React အတွက် Unique Key
            key={page}

            // Button နှိပ်ရင် အဲ့ဒီ Page Number ကို Parent ဆီပို့မယ်
            onClick={() => onPageChange(page)}

            className={`
          h-10
          w-10
          rounded-lg
          text-sm
          font-medium
          transition

          ${
            // လက်ရှိ Page ဆိုရင် Black Background ပြမယ်
            currentPage === page

              ? "bg-black text-white"

              // မဟုတ်ရင် Normal Style
              : "border hover:bg-gray-100"
          }
          `}
          >
            {/* Button ပေါ်မှာ Page Number ပြမယ် */}
            {page}
          </button>
        ),
      )}

      {/* Next Button */}
      <button

        // နောက်ဆုံး Page ရောက်နေရင် Next ကို Disable လုပ်မယ်
        disabled={currentPage === totalPages}

        // Next နှိပ်ရင် Page Number ကို ၁ တိုးပြီး Parent ဆီပို့မယ်
        onClick={() => onPageChange(currentPage + 1)}

        className="
        rounded-lg
        border
        px-4
        py-2
        text-sm
        disabled:cursor-not-allowed
        disabled:opacity-40
        hover:bg-gray-100
        "
      >
        Next
      </button>
    </div>
  );
}

// တခြား Component တွေက အသုံးပြုနိုင်အောင် Export လုပ်မယ်
export default ProductsPagePagination;

// Parent Component
// │
// │ currentPage = 3
// │ totalPages = 8
// │ onPageChange()
// │
// ▼
// ProductsPagePagination (UI Only)
// │
// ├── Previous
// ├── 1
// ├── 2
// ├── 3  ← Active
// ├── 4
// ├── 5
// ├── 6
// ├── 7
// ├── 8
// └── Next

// User Click "5"
//         │
//         ▼
// onPageChange(5)
//         │
//         ▼
// Parent Component
//         │
//         ▼
// URL Update / API Request / State Update