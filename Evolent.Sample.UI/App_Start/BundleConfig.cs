using System.Threading;
using System.Web;
using System.Web.Optimization;

namespace Evolent.Sample.UI
{
    public class BundleConfig
    {
        /// <summary>
        /// Register bundles specific to this site or code for overriding platform code
        /// </summary>
        private static void RegisterBundles_App(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/js/evolent").Include(
                "~/Scripts/contactmanagement.js"
              ));
        }

        /// <summary>
        /// Register any 3rd party libraries here
        /// </summary>
        private static void RegisterBundles_Vendors(BundleCollection bundles)
        {
            #region JQuery

            bundles.Add(new ScriptBundle("~/js/jqueryMain").Include(
                "~/Scripts/jquery-3.3.1.min.js",
                "~/Scripts/jquery-ui-1.12.1.min.js",
                "~/Scripts/jquery.validate.min.js"
            ));

            //bundles.Add(new ScriptBundle("~/js/jqueryval").Include(
            //    "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/js/jqgrid").Include(
                "~/Scripts/jqgrid/grid.locale-en.js",
                "~/Scripts/jqgrid/jquery.jqAutoComplete.js",
                "~/Scripts/jqgrid/jquery.jqDatePicker.js",
                "~/Scripts/jqgrid/jquery.jqGrid.js"
            ));

            #endregion

            #region Bootstrap
            //bundles.Add(new ScriptBundle("~/js/bootstrap").Include(
            //    "~/Scripts/bootstrap.min.js"
            //    , "~/Scripts/bootstrap-dialog.js")
            //    );
            //bundles.Add(new StyleBundle("~/style/bootstrapbundle").Include(
            //    "~/content/bootstrap.css",
            //    "~/content/bootstrap-extended.css",
            //    "~/content/base/normalize.css",
            //    "~/content/bootstrap-dialog.css")
            //    );
            #endregion


            #region All common scripts

            bundles.Add(new StyleBundle("~/style/main").Include(
              "~/content/evolent.css")
               );

            bundles.Add(new StyleBundle("~/style/jqgrid").Include(
                "~/content/ui.jqgrid.css")
            );

            bundles.Add(new StyleBundle("~/style/jqueryui").Include(
                "~/content/themes/base/jquery-ui.min.css")
            );

            #endregion

        }

        #region RegisterBundles
        public static void RegisterBundles(BundleCollection bundles)
        {
            RegisterBundles_Vendors(bundles);
            RegisterBundles_App(bundles);

            bundles.UseCdn = true;

            // Clear all items from the default ignore list to allow minified CSS and JavaScript files to be included in debug mode
            bundles.IgnoreList.Clear();

            // Add back the default ignore list rules sans the ones which affect minified files and debug mode
            bundles.IgnoreList.Ignore("*.intellisense.js");
            bundles.IgnoreList.Ignore("*-vsdoc.js");
            bundles.IgnoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            if (HttpContext.Current != null && !HttpContext.Current.IsDebuggingEnabled)
            {
                BundleTable.EnableOptimizations = true;
            }
        }
        #endregion
    }
}