import React from 'react';
import { CreditCard, Plus, ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react';
import { useOrder } from '../../../context/OrderContext';
import { useAuth } from '../../../context/AuthContext';

interface PaymentsPageProps {
  onOpenTopUp: () => void;
}

export const PaymentsPage: React.FC<PaymentsPageProps> = ({ onOpenTopUp }) => {
  const { transactions } = useOrder();
  const { student } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Top Banner with Student Wallet Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Wallet Balance Card */}
        <div className="md:col-span-2 relative overflow-hidden bg-gradient-to-br from-campus-purple-900 via-campus-purple-800 to-campus-purple-950 text-white p-6 sm:p-8 rounded-3xl shadow-soft-lg border border-campus-purple-700/60 flex flex-col justify-between">
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-campus-mango-300">
                Campus Student Wallet
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display mt-2">
                ₹{student.walletBalance}
              </h2>
              <p className="text-xs text-campus-purple-200 mt-1">
                Linked to {student.studentId} • {student.name}
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenTopUp}
              className="flex items-center gap-1.5 bg-campus-mango-400 hover:bg-campus-mango-300 text-campus-charcoal-950 text-xs font-black px-4 py-2.5 rounded-xl shadow-sm hover:shadow-mango-glow transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Top-Up Balance</span>
            </button>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-campus-purple-700/60 flex items-center justify-between text-xs text-campus-purple-200">
            <span>Instant 1-tap checkout enabled at all 4 campus counters</span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" /> Verified
            </span>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-white p-6 rounded-3xl border border-campus-purple-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-2xl bg-campus-mango-100 flex items-center justify-center text-campus-charcoal-900 mb-3">
              <CreditCard className="w-5 h-5 text-campus-mango-600" />
            </div>
            <h3 className="font-black text-base text-campus-charcoal-900 font-display">
              Saved Payment Methods
            </h3>
            <p className="text-xs text-campus-charcoal-500 mt-1">
              Hostel Dining Card, UPI AutoPay, and Counter Pay
            </p>
          </div>

          <div className="pt-4 border-t border-campus-purple-50 text-xs text-campus-charcoal-600 space-y-1">
            <div className="flex justify-between">
              <span>Monthly Spent</span>
              <span className="font-extrabold text-campus-charcoal-900">₹840</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-bold">
              <span>Campus Savings</span>
              <span>₹145 saved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Transactions History */}
      <div className="bg-white rounded-3xl border border-campus-purple-100 p-6 shadow-soft">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg sm:text-xl font-black text-campus-charcoal-900 font-display">
              Recent Transactions
            </h3>
            <p className="text-xs text-campus-charcoal-500 mt-0.5">
              History of wallet deductions and cafeteria payments
            </p>
          </div>
        </div>

        <div className="divide-y divide-campus-purple-50">
          {transactions.map((txn) => {
            const isDebit = txn.type === 'debit';
            return (
              <div key={txn.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isDebit ? 'bg-campus-purple-50 text-campus-purple-800' : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {isDebit ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownLeft className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-campus-charcoal-900">{txn.title}</h4>
                    <p className="text-[11px] text-campus-charcoal-400">
                      {txn.date} • {txn.method}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`text-sm font-black font-display block ${
                      isDebit ? 'text-campus-charcoal-900' : 'text-emerald-700'
                    }`}
                  >
                    {isDebit ? '-' : '+'}₹{txn.amount}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                      txn.status === 'paid'
                        ? 'bg-emerald-50 text-emerald-700'
                        : txn.status === 'refunded'
                        ? 'bg-blue-50 text-blue-700'
                        : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    {txn.status.toUpperCase()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
