'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function StoreSetupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    productType: '',
    factory: '',
    factoryCost: 50,
    profit: '',
  })

  const productTypes = ['تي شيرت', 'كوب', 'قبعة', 'حقيبة']
  const factories = ['مصنع النجاح', 'مصنع الإبداع', 'مصنع الجودة']

  const platformFee = formData.factoryCost * 0.3
  const finalPrice = formData.profit
    ? parseFloat(formData.profit) + formData.factoryCost + platformFee
    : 0

  const handleSubmit = () => {
    // حفظ المنتج
    const products = JSON.parse(localStorage.getItem('products') || '[]')
    products.push({
      id: Date.now(),
      name: 'تي شيرت بريميوم',
      price: finalPrice,
      factoryCost: formData.factoryCost,
      platformFee,
      profit: parseFloat(formData.profit),
    })
    localStorage.setItem('products', JSON.stringify(products))
    router.push('/designer/setup/store/success')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">إعداد المنتج</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {/* الخطوة 1 */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-4">الخطوة 1: اختر المنتج الخام</h2>
              <div className="space-y-2">
                {productTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFormData({ ...formData, productType: type })
                      setStep(2)
                    }}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 text-right"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* الخطوة 2 */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-4">الخطوة 2: اختر المصنع</h2>
              <div className="space-y-2 mb-4">
                {factories.map((factory) => (
                  <button
                    key={factory}
                    onClick={() => {
                      setFormData({ ...formData, factory })
                      setStep(3)
                    }}
                    className="w-full p-4 border-2 border-gray-300 rounded-lg hover:border-primary hover:bg-blue-50 text-right"
                  >
                    {factory}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-primary hover:underline"
              >
                ← رجوع
              </button>
            </div>
          )}

          {/* الخطوة 3 */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-4">الخطوة 3: تحديد السعر</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">تكلفة المصنع</p>
                  <p className="text-lg font-semibold">{formData.factoryCost} TFT</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">عمولة تفصيل (30%)</p>
                  <p className="text-lg font-semibold">{platformFee.toFixed(2)} TFT</p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">ربحك</label>
                  <input
                    type="number"
                    value={formData.profit}
                    onChange={(e) => setFormData({ ...formData, profit: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="75"
                  />
                </div>

                {formData.profit && (
                  <div className="bg-gold bg-opacity-20 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">السعر النهائي للعميل</p>
                    <p className="text-2xl font-bold text-gold">{finalPrice.toFixed(2)} TFT</p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    رجوع
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.profit}
                    className={`flex-1 px-4 py-2 rounded-lg font-semibold ${
                      formData.profit
                        ? 'bg-primary text-white hover:bg-primary-dark'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    نشر في المول
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
